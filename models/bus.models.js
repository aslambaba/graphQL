const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
})

const Busmodel = mongoose.model('BusNotification', busSchema);

module.exports = Busmodel;