const RESERVE_MODEL = require('./reserveModel');
const AGENCY_MODEL = require('./../agencies/agencyModel');

const reserveDispatchTable = {
    INSERT: (data) => RESERVE_MODEL.create(data),
    FIND_BY_DATE: ({ year, month, day, timeSection }) =>
        RESERVE_MODEL
            .find({
                'reservedDate.year': year,
                'reservedDate.month': month,
                'reservedDate.day': day,
                'reservedDate.timeSection': timeSection
            })
            .exec(),

    FIND_BY_PHONE: (phone) => RESERVE_MODEL.find({ profilePhone: phone }).lean().exec(),

    GET_ALL_BY_DATE: (year, month, day) =>
        RESERVE_MODEL
            .find({
                'reservedDate.year': year,
                'reservedDate.month': month,
                'reservedDate.day': day
            })
            .lean()
            .exec(),

    GET_ALL_BY_DATE_AGENCY: (agencyUniqueId, year, month, day) =>
        RESERVE_MODEL
            .find({
                agencyUniqueId: agencyUniqueId,
                'reservedDate.year': year,
                'reservedDate.month': month,
                'reservedDate.day': day
            })
            .lean()
            .exec()

}

module.exports.reserveDAL = reserveDispatchTable;
