const mongoose = require('mongoose');
const { schema } = require('./bus.models');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdNoti: [{
        type: Schema.Types.ObjectId,
        ref: 'BusNotification',
    }]
})

const memberModel = mongoose.model('BusMembers', memberSchema);
module.exports = memberModel;