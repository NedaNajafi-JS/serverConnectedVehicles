const reserveService = require('./reserveService.js');
const { response, ServerError } = require('./../../shared/utilities/constructors');

const reserve = async (req, res) => {
    try {
        const reserveResult = await reserveService.reserve(req.body, req.user);
        return res.status(200).json(new response(reserveResult));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

// const timming = fn => async (...args) => {
//     const start = performance.now();
//     const fnResponse = await fn(...args);
//     const end = performance.now();
//     console.log(`function ${fn.name} performance is ${end - start} milisecond`);
//     return fnResponse;
// }

const freeTimesGet = async (req, res) => {
    try {
        return res.status(200).json(new response(await reserveService.freeTimesGet(req.body)));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

const freeTimesGetByAgencyId = async (req, res) => {
    try {
        return res.status(200).json(new response(await reserveService.freeTimesGetByAgencyId(req.body)));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

const getUserReserves = async (req, res) => {
    try {
        return res.status(200).json(new response(req.user ? (await reserveService.getUserReserves({ userPhone: req.user.phone, filters: req.body.filters })) : null));
    } catch (error) {
        return res.status(400).json(new ServerError(error));
    }
}

module.exports = {
    reserve,
    freeTimesGet,
    freeTimesGetByAgencyId,
    getUserReserves
}
