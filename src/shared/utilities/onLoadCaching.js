
const /*AGENCY_DAL_CLASS*/agencyDispatchTable = require('./../../modules/agencies/agencyDAL');

//const AGENCY_DAL = new AGENCY_DAL_CLASS();
const { CACHE } = require('./../config/keys');

(() => {

    //CACHE.set('config', find(CONFIG_MODEL));

    CACHE.set('agencies', agencyDispatchTable["FIND"]/* AGENCY_DAL.find()*/);
    
    //CACHE.set('vehicles', find(VEHICLE_MODEL));

})();