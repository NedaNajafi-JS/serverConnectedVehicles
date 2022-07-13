const AGENCY_MODEL = require('./agencyModel');

const agencyDispatchTable = {
    INSERT: (data) => AGENCY_MODEL.create(data),
    INSERT_PIECE: (id, data) => AGENCY_MODEL.findOneAndUpdate({ _id: id }, { $push: { pieces: data } }, { new: true }).exec(),
    UPDATE: (data) => AGENCY_MODEL.findOneAndUpdate({ _id: data.id }, data, { new: true }).exec(),
    UPDATE_BY_UNIQUEID: (data) => AGENCY_MODEL.findOneAndUpdate({ uniqueId: data.uniqueId }, data, { new: true }).exec(),
    UPDATEVEHICLES: (data) => AGENCY_MODEL.findOneAndUpdate({ _id: data.id }, { $push: { vehicles: data.vehicles } }, { new: true }).exec(),
    REMOVE: (id) => AGENCY_MODEL.findByIdAndDelete(id).exec(),
    FIND_BY_ID: (id) => AGENCY_MODEL.findById(id).lean().exec(),
    FIND_BY_UNIQUEID: (uniqueId) => AGENCY_MODEL.findOne({ uniqueId: uniqueId }).lean().exec(),
    FIND_BY_USERNAME: (username) => AGENCY_MODEL.findOne({ username: username }).lean().exec(),
    GET_VEHICLES: (id) => AGENCY_MODEL.findById(id).select({ _id: 0, vehicles: 1 }).lean().exec(),
    FIND: () => AGENCY_MODEL.find().lean().exec()
}

class agencyDAL {

    constructor() { }

    async insert(data) {
        return AGENCY_MODEL.create(data);
    }

    async update(data) {

        return AGENCY_MODEL
            .findOneAndUpdate({
                _id: data.id
            }, data, {
                new: true
            })
            .exec();
    }

    async updateVehicles(data) {
        return AGENCY_MODEL
            .findOneAndUpdate({
                _id: data.id
            }, {
                $push: { vehicles: data.vehicles }
            })
            .exec();
    }

    async remove() {

    }

    async findById(id) {
        return AGENCY_MODEL.findById(id);
    }

    async getVehicles(id) {
        return AGENCY_MODEL
            .findById(id)
            .select({ _id: 0, vehicles: 1 });
    }

    async find() {
        return AGENCY_MODEL.find().lean().exec();
    }
}

module.exports = agencyDispatchTable;
