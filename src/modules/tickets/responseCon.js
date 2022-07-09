const { response, ServerError, ParameterError } = require('./../../shared/utilities/constructors');
const { validationResult } = require('express-validator');
const responseService = require('./responseService');
const ticketService = require('./ticketService');

const insertOrUpdate = async (req, res, next) => {

    (() => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json(new ParameterError(errors));
        }
    })();

    const response = req.body;

    const responses = await responseService.insertOrUpdate(response);
    return res.status(200).json(new response(responses));

}

const getAll = async (req, res, next) => {
    try {
        let tickets = Promise.resolve(ticketService.get(req.params.id));
        tickets.responses= Promise.resolve(responseService.getAll());
        return res.status(200).json(new response(tickets));
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

        return res.status(200).json(new response(Promise.resolve(responseService.get(req.params.id))))
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