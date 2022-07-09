CONFIG_MODEL = require('./configModel');

const setGeographicScale = async (req, res, next) => {
    try{

        let config = await find(CONFIG_MODEL);
        config = config[0] || new CONFIG_MODEL();
        config.geographic_scale = req.body.geographic_scale;
        await config.save();
        return res.status(200).json(response(config));
        
    }catch(error){
        return res.status(400).json(new ServerError(error));
    }
}

const getConfig = async (req, res, next) => {
    try{
        const config = await find(CONFIG_MODEL);
        config = config[0] || null;
        return res.status(200).json(response(config));
    }catch(err) {
        return res.status(400).json(ServerError(err));
    }
}

module.exports = {
    setGeographicScale,
    getConfig
}