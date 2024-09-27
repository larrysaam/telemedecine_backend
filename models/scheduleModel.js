const mongoose = require('mongoose')


// availability is a 2D array of 7 arrays 
// Each array contains [start, end] hours
// Each of the 7 arrays represent the days of the week

const scheduleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    doctorId: {
        type: String,
        require: true,
    },
    availability: [
        {
            day: String,
            start: String,
            end: String,
            checked: Boolean
        }
    ]
})

module.exports = mongoose.model('Schedule', scheduleSchema)