const RESPONSE_MODEL = require('./responseModel');

class ticketDAL {

    async insert (data) {
        return RESPONSE_MODEL.create(data);
    }

    async update (id,data) {

        return RESPONSE_MODEL
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
        return RESPONSE_MODEL.findById(id);
    }

    async find () {
        return RESPONSE_MODEL.find().exec();
    }
}

module.exports = ticketDAL;