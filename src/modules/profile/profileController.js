const { responseV1, ServerError } = require('./../../shared/utilities/constructors');
const profileService= require('./profileService');

const login = async (req, res) => {
    try{
        // req.body.username = 'admin';
        // req.body.password = 'admin';
        return res.status(200).json(new responseV1(await profileService.login(req.body.username, req.body.password)));
    }catch(error){
        return res.status(400).json(new ServerError(error));
    }
}

module.exports = {
    login
}