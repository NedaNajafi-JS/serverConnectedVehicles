const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    
    geographic_scale: Number
});

module.exports = mongoose.model('config', configSchema);