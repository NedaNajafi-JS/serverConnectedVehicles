const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    
    type: {
        type: String,
        enum:[
            "EV",
            "EBUS",
            "EBike"
        ]
    },
    system: {
        type: String,
        enum: [
            "elctrical",
            "hybrid"
        ]
    },
    model: String,
    capacity: String,
    charger: String,
    color: String,
    engine: String,
    engine_type: {
        type: String,
        enum:[
            "central",
            "in_wheel"
        ]
    },
    VIN: String,
    profileId: String,
    car_tag: String,
    agency: String,
    coordinate: {
        lat: Number,
        lon: Number
    }
});

module.exports = mongoose.model('vehicle', vehicleSchema);