
const agencyDispatchTable = require('./../../modules/agencies/agencyDAL');
const { CACHE } = require('./../config/keys');

(() => {

    //CACHE.set('config', find(CONFIG_MODEL));

    CACHE.set('agencies', agencyDispatchTable["FIND"]);
    
    //CACHE.set('vehicles', find(VEHICLE_MODEL));

})();