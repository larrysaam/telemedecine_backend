const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        require: true,
    },
    doctorId: {
        type: String,
        require: true,
    },
    chat: [
        {
            sender: String,
            receiver: String,
            content: String,
            messagetype: String,
            timestamp: String
        }
    ]
})

module.exports = mongoose.model('Chat', chatSchema)