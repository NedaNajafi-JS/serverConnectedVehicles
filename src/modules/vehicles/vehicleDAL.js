const VEHICLE_MODEL = require('./vehicleModel');

const vehicleDispatchTable = {
    INSERT: (data) => VEHICLE_MODEL.create(data),
    UPDATE: (data) => VEHICLE_MODEL
        .findOneAdnUpdate({
            _id: data.id
        }, data, {
            new: true
        })
        .exec(),

    FIND_BY_ID: (id) => VEHICLE_MODEL.findById(id),
    FIND_BY_IDS: (ids) => VEHICLE_MODEL
        .find(
            {
                _id: { $in: ids }
            }
        )
        .exec(),

    FIND: () => VEHICLE_MODEL.find().exec()

}

module.exports = vehicleDispatchTable;
class vehicleDAL {

    async insert(data) {
        return VEHICLE_MODEL.create(data);
    }

    async update(data) {

        return VEHICLE_MODEL
            .findOneAdnUpdate({
                _id: data.id
            }, data, {
                new: true
            })
            .exec();
    }

    async remove() {

    }

    async findById(id) {
        return VEHICLE_MODEL.findById(id);
    }

    async findByIds(ids) {
        return VEHICLE_MODEL
            .find(
                {
                    _id: { $in: ids }
                }
            )
            .exec();
    }

    async find() {
        return VEHICLE_MODEL.find().exec();
    }
}

// module.exports = vehicleDAL;