const mongoose = require('mongoose')

const consultationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        require: true,
    },
    doctorId: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: 'waiting'
    },
    scheduledDate: {
        type: String,
        require: true,
    },
    schedule: [
        {
            day: String,
            timeslot: String
        }
    ]
})

module.exports = mongoose.model('Consultation', consultationSchema)