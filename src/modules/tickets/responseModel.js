const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({

    ticket_id: String,
    createDate: {
        type:Date,
        default:Date.now
    },
    ticketNumber: String,
    description: String,
    creator:  {
        type: String,
        enum: [
            "admin",
            "user",
            "agency"
        ]
    }
});

module.exports = mongoose.model('response_ticket', responseSchema);