const vehicleDAL = require('./vehicleDAL');

const getAll = async () => {
    return Promise.resolve(vehicleDAL['FIND']());
}

const insertOrUpdate = async (vehicle) => {

    if (vehicle.id) {
        await vehicleDAL['UPDATE'](vehicle.id, vehicle);
    } else {
        await vehicleDAL['INSERT'](vehicle);
    }

    return Promise.resolve(getAll());

}

const get = async (vehicleId) => {
    return Promise.resolve(vehicleDAL['FIND_BY_ID'](vehicleId));
}

const deleteOne = async (req, res, next) => {

}

module.exports = {
    insertOrUpdate,
    getAll,
    get,
    deleteOne
}