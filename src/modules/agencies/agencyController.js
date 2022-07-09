const agencyService = require('./agencyService');
const { validationResult } = require('express-validator');
const { ServerError, ParameterError, response } = require('./../../shared/utilities/constructors');

const insertOrUpdate = async (req, res, next) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ParameterError(errors));
        }

        const agencies = await agencyService.insertOrUpdate(req.body, req.body.action);

        return res.status(200).json(new response(agencies));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }

}

const getAll = async (req, res, next) => {

    try {
        return res.status(200).json(new response(await agencyService.getAll()));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }

}

const categorizedGetAll = async (req, res) => {
    try {
        return res.status(200).json(new response(await agencyService.categorizedGetAll()))
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

const get = async (req, res, next) => {
    try {
        return res.status(200).json(new response(await agencyService.get(req.body.id)));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

const getNearest = async (req, res, next) => {

    try {
        const coordinate = [{
            lat: req.params.lat,
            lon: req.params.lon
        }]

        return res.status(200).json(new response(await agencyService.getNearest(coordinate)));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }

}

const setUserPassword = async (req, res, next) => {
    return res.status(200).json(new response(await agencyService.setUserPassword(req.body)));
}

const assignVehicleToAgency = async (req, res, next) => {
    return res.status(200).json(new response(await agencyService.assignVehicleToAgency(req.body)));
}

const getAssignedVehicles = async (req, res) => {
    const data = {
        id: req.params.id,
        filters: req.query
    }
    return res.status(200).json(new response(await agencyService.getAssignedVehicles(data)));
}

const deleteAgencyById = async (req, res) => {
    try {
        return res.status(200).json(new response(await agencyService.deleteAgencyById(req.params.id)));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

module.exports = {
    insertOrUpdate,
    getAll,
    categorizedGetAll,
    get,
    getNearest,
    setUserPassword,
    assignVehicleToAgency,
    getAssignedVehicles,
    deleteAgencyById
}