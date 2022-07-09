const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const axios = require('axios');


module.exports = passport => {
    passport.use(
        new JwtStrategy({
            jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromBodyField('Authorization'), ExtractJwt.fromUrlQueryParameter('Authorization')]),
            secretOrKey: 'secret'
        }, async (payload, done) => {
            if(payload.payloadType && payload.payloadType === 'connectedAdminLogin'){
                //http://www.mapna-evidc.com/server1
                const admin =  await axios.get(`http://www.mapna-evidc.com/server1/api/admin/${payload.role}/${payload.username}`);
                return admin ? done(null, admin) : done('کاربری با این مشخصات یافت نشد', false);
            }

            if(payload.payloadType && payload.payloadType === 'connectedHmiUserLogin'){
                const {data} = await axios.get(`http://www.mapna-evidc.com/server1/api/profile/${payload.id}`);
                return data ? done(null, data) : done('کابری با این مشخصات یافت نشد', false);
            }
        })
    )
}