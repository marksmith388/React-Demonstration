const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventsSchema =  new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
});

const Events = mongoose.model('Events', eventsSchema);

module.exports = Events;