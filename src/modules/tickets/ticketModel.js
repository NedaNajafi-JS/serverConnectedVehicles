const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    
    type: {
        type: String,
        enum:[
            "admin",
            "user"
        ]
    },
    status: {
        type: String,
        enum: [
            "Responding",
            "Copmlete"
        ],
        default: "Responding"
    },
    ticketNumber: String,
    user_id: String,
    createDate: {
        type:Date,
        default:Date.now
    },
    ticketTitle: String,
    group:String,
    priority:{
        type: String,
        enum: [
            "High",
            "Low",
            "Medium",
            "Normal"
        ],
        default: "Normal"
    },
    updateDate: {
        type:Date,
        default:Date.now
    },
    description: String,
    creator:  {
        type: String,
        enum: [
            "admin",
            "user",
            "agency"
        ]
    },
    unread:{
        type:Boolean,
        default: true
    },
    responsed:{
        type:Boolean,
        default: false
    }
});

module.exports = mongoose.model('ticket', ticketSchema);