const ticketDAL_class = require('./ticketDAL');
const ticketDAL = new ticketDAL_class();

const insertOrUpdate = async (ticket) => {

    if (ticket.id) {
        await ticketDAL.update(ticket.id, ticket);
    } else {
        await ticketDAL.insert(ticket);
    }

    return Promise.resolve(ticketDAL.find());

}

const getAll = async () => {
    return Promise.resolve(ticketDAL.find());
}

const get = async (ticketId) => {
    return Promise.resolve(ticketDAL.findById(ticketId));
}

const deleteOne = async (req, res, next) => {

}

module.exports = {
    insertOrUpdate,
    getAll,
    get,
    deleteOne
}