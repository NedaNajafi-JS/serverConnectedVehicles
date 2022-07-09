const TICKET_MODEL = require('./ticketModel');

class ticketDAL {

    async insert (data) {
        return TICKET_MODEL.create(data);
    }

    async update (id,data) {

        return TICKET_MODEL
            .findOneAndUpdate({
                _id: id
            }, data, {
                new: true
            })
            .exec();
    }

    async remove () {

    }

    async findById (id) {
        return TICKET_MODEL.findById(id);
    }

    async find () {
        return TICKET_MODEL.find().exec();
    }
}

module.exports = ticketDAL;