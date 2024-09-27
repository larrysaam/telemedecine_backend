const mongoose = require('mongoose')

const specialitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    speciality: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Speciality', specialitySchema)