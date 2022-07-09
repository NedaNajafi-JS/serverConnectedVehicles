const { response, ServerError, ParameterError } = require('./../../shared/utilities/constructors');
const { validationResult } = require('express-validator');
const vehicleService = require('./vehicleService');

const insertOrUpdate = async (req, res, next) => {

    (() => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json(new ParameterError(errors));
        }
    })();

    const vehicle = req.body;

    const vehicles = await vehicleService.insertOrUpdate(vehicle);
    return res.status(200).json(new response(vehicles));

}

const getAll = async (req, res, next) => {
    try {
        return res.status(200).json(new response(await vehicleService.getAll()));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

const get = async (req, res, next) => {
    try {
        (() => {
            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json(new ParameterError(errors));
            }
        })();

        return res.status(200).json(new response(Promise.resolve(vehicleService.get(req.params.id))))
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }

}

const deleteOne = async (req, res, next) => {

}

module.exports = {
    insertOrUpdate,
    getAll,
    get,
    deleteOne
}