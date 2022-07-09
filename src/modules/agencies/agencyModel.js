const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    
    uniqueId: String,
    code: String,
    name: String,
    address: {
        province: String,
        city: String,
        address1: String,
        coordinate: {
            lat: Number,
            lon: Number
        }
    },

    phone: String,
    services: [String],
    vehicles: [String],
    status: Boolean,
    manager: {
        name: String,
        phone: String
    },
    username: String,
    password: String,
    serviceTime:[{type: Number, default: 8}, {type: Number, default: 15}],
    NumberOfServicePerHour: {
        type: Number,
        default: 10
    }
    
});

module.exports = mongoose.model('agencies', agencySchema);