const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
    agencyUniqueId: String,
    profilePhone: String,
    vehicleAlias: String,
    vehicleVIN: String,
    reservedDate:{
        year: Number,
        month: Number,
        day: Number,
        timeSection: Number
    },
    doReserveDate: String,
    demandedServices: [String]
});

module.exports = mongoose.model('agencyReserve', reserveSchema);