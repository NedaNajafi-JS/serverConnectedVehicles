const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const axios = require('axios');


module.exports = passport => {
    passport.use(
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromBodyField('Authorization'), ExtractJwt.fromUrlQueryParameter('Authorization')]),
            secretOrKey: process.env.secretOrKey
        }, async (payload, done) => {
            if(payload.payloadType && payload.payloadType === 'connectedAdminLogin'){
                const admin =  await axios.get(`https://www.mapna-evidc.com/server1/api/admin/${payload.role}/${payload.username}`);
                return admin ? done(null, admin) : done('User not found', false);
            }

            if(payload.payloadType && payload.payloadType === 'connectedHmiUserLogin'){
                const {data} = await axios.get(`https://www.mapna-evidc.com/server1/api/profile/${payload.id}`);
                return data ? done(null, data) : done('User not found', false);
            }
        })
    )
}