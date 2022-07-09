const axios = require('axios');
const AGENCY_DAL = require('./agencyDAL');
const VEHICLE_DAL = require('./../vehicles/vehicleDAL');

const { CACHE, mapBoxConfig } = require('./../../shared/config/keys');

const { filterClosure } = require('./../../shared/utilities/common');

const insertOrUpdate = async (agency, action) => {

    try {

        let new_elem = AGENCY_DAL[action.toUpperCase()] ? await AGENCY_DAL[action.toUpperCase()](agency) : '';
        const agencies = new_elem ? await CACHE.push('agencies', new_elem) : "";

        return Promise.resolve(categorizedGetAll());
    } catch (error) {
        return Promise.reject(error);
    }

}

const getAll = async () => {

    try {

        const agencies = await CACHE.get('agencies', () => {
            return AGENCY_DAL['FIND']();
        });
        return Promise.resolve(agencies);

    } catch (error) {
        return Promise.resolve(error);
    }

}

const categorize = (provinceName, cityName, agency, categorizedAgencies) => {

    let provinceObject = categorizedAgencies.find(provinceObject => provinceObject['province'] === provinceName) ||
        (() => {
            let provinceObjectNew = { province: provinceName };
            categorizedAgencies.push(provinceObjectNew);
            return provinceObjectNew
        })();

    provinceObject['city'] = provinceObject['city'] || [];
    let cityObject = provinceObject['city'].find(cityObject => cityObject['name'] === cityName) ||
        (() => {
            let cityObjectNew = { name: cityName, agencies: [] };
            provinceObject['city'].push(cityObjectNew);
            return cityObjectNew
        })();

    cityObject.agencies.push(agency);
    return categorizedAgencies;

}

const categorizedGetAll = async () => {
    const agencies = await getAll();
    let categorizedAgencies = [];
    categorizedAgencies = agencies.reduce((previousResult, currentAgency) => {
        return categorize(currentAgency.address.province, currentAgency.address.city, currentAgency, previousResult);
    }, []);

    return Promise.resolve(categorizedAgencies);
}

const get = async (agencyId) => {
    try {
        return Promise.resolve(AGENCY_DAL['FIND_BY_ID'](agencyId));
    } catch (error) {
        return Promise.resolve(error);
    }
}

const getByUniqueId = async (uniqueId) => {
    try {
        return Promise.resolve(AGENCY_DAL['FIND_BY_UNIQUEID'](uniqueId));
    } catch (error) {
        return Promise.resolve(error);
    }
}

const getNearest = async (coordinate) => {

    const agencies = await CACHE.get('agencies', () => {
        return AGENCY_DAL['FIND']();
    });

    let coordinates = await agencies.map(agency => agency.address.coordinate);
    coordinate.push(...coordinates);

    const result = await getRoutingData(coordinate);

    return result;
}

async function getRoutingData(coordinates) {
    try {
        var url = 'https://api.mapbox.com/directions-matrix/v1/mapbox/driving-traffic/';
        var urlend = `?sources=0&annotations=distance,duration&access_token=${mapBoxConfig.mapBoxToken}`;
        let middURL = '';
        let mixedURL = '';

        const residual = coordinates.length % 10;
        const num = residual > 0 ? parseInt(coordinates.length / 10) + 1 : parseInt(coordinates.length / 10);

        let response = [];
        for (k = 0; k < num; k++) {
            for (i = k * 10; i < (k * 10) + 20; i++) {
                if (!coordinates[i]/* && k === (num - 1)*/) {
                    break;
                }
                middURL = middURL + `${coordinates[i].lat},${coordinates[i].lon};`
            }

            mixedURL = url + middURL;
            mixedURL = mixedURL.slice(0, -1);
            mixedURL = mixedURL + urlend;
            console.log(mixedURL)
            const { data: { destinations } } = await axios.get(mixedURL);
            response.push(...destinations);
            mixedURL = '';
            middURL = '';

        }

        return Promise.resolve(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function setUserPassword({ uniqueId, username, password }) {

    try {
        const repeatedUsername = await AGENCY_DAL['FIND_BY_USERNAME'](username);
        if (repeatedUsername) {
            throw 'این شناسه ورود قبلا ثبت شده است';
        }

        //http://www.mapna-evidc.com/server1/api/admin/insert
        const { data: { admin } } = await axios.post('http://www.mapna-evidc.com/server1/api/admin/insert', {
            username: username,
            password: password,
            role: 'connectedAgency'
        });

        return await AGENCY_DAL['UPDATE_BY_UNIQUEID']({
            uniqueId,
            username,
            password
        });
    } catch (err) {
        return err.message ? err.message : err
    }


}

async function assignVehicleToAgency({ id, vehiclesIdsList }) {

    return AGENCY_DAL['UPDATEVEHICLES']
        ({
            id,
            vehicles: vehiclesIdsList
        });
}

async function getAssignedVehicles({ id, filters }) {

    const { vehicles } = await AGENCY_DAL['GET_VEHICLES'](id);
    const vehiclesObjs = await VEHICLE_DAL['FIND_BY_IDS'](vehicles);
    let customisedFilter = filterClosure(filters);
    return vehiclesObjs.filter(customisedFilter);
}

async function deleteAgencyById(id) {
    AGENCY_DAL['REMOVE']
        ? await AGENCY_DAL['REMOVE'](id)
        : {};

    return Promise.resolve(categorizedGetAll());
}

module.exports = {
    insertOrUpdate,
    getAll,
    categorizedGetAll,
    get,
    getByUniqueId,
    getNearest,
    getRoutingData,
    setUserPassword,
    assignVehicleToAgency,
    getAssignedVehicles,
    deleteAgencyById
}