const responseDAL_class = require('./responseDAL');
const responseDAL = new responseDAL_class();

const ticketDAL_class = require('./ticketDAL');
const ticketDAL = new ticketDAL_class();

const insertOrUpdate = async (response) => {

    if (response.id) {
        await responseDAL.update(response.id, response);
    } else {
        ticket.id = response.ticket_id;
        if(response.create=="agency") {
            ticket.responsed = true
            ticket.unread = false
        }
        else if(response.create=="user" || response.create=="admin") {
            ticket.responsed = false
            ticket.unread = true
        }
        await ticketDAL.update(ticket.id, ticket);
        await responseDAL.insert(response);
    }

    return Promise.resolve(responseDAL.find());

}

const getAll = async () => {
    return Promise.resolve(responseDAL.find());
}

const get = async (responseId) => {
    return Promise.resolve(responseDAL.findById(responseId));
}

const deleteOne = async (req, res, next) => {

}

module.exports = {
    insertOrUpdate,
    getAll,
    get,
    deleteOne
}