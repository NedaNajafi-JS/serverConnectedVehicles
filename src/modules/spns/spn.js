const mongoose = require('mongoose');

const spnSchema = new mongoose.Schema({
    EV: [String],
    spn: Number,
    source: Number,
    topic: String,
    name: String,
    description: String,
    dimenssion: String,
    json_key: String
});

module.exports = mongoose.model('spn', spnSchema);