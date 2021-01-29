const mongoose = require('mongoose');


const AdminSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }
});

module.exports = mongoose.model('Admin', AdminSchema);