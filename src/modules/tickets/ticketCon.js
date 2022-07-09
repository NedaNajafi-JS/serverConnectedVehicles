const { response, ServerError, ParameterError } = require('./../../shared/utilities/constructors');
const { validationResult } = require('express-validator');
const ticketService = require('./ticketService');

const insertOrUpdate = async (req, res, next) => {

    (() => {
        const errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json(new ParameterError(errors));
        }
    })();

    if(req.body.status=="در حال بررسی")
        req.body.status = "Responding"
    else if(req.body.status=="تکمیل شده")
        req.body.status = "copmlete"

    const ticket = req.body;

    const tickets = await ticketService.insertOrUpdate(ticket);
    return res.status(200).json(new response(tickets));

}

const getAll = async (req, res, next) => {
    try {
        return res.status(200).json(new response(Promise.resolve(ticketService.getAll())));
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

        return res.status(200).json(new response(Promise.resolve(ticketService.get(req.params.id))))
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