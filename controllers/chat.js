const mongoose = require('mongoose')
const Chat = require('../models/chatModel')


// create a new chat between user and doctor
exports.createChat=(req, res)=>{
    const { userId, doctorId } = req.body

    const chatbox = new Chat({
        _id: new mongoose.Types.ObjectId(),
        userId,
        doctorId,
        chat: []
    })

    //save chat to Mongodb collection
    chatbox.find({ userId, doctorId })
    .exec()
    .then(result=>{
        if(result.length > 0){
            res.status(200).json({
                message: 'chat already exists',
                data: result
            })
        }else{

            //create new chat and save
            chatbox.save()
            .then(result=>{
                res.status(200).json({
                    message: 'saved',
                    data: chatbox
                })
            })
            .catch(err=>{
                res.status(500).json({
                    message: err
                })
            })
        }
    })
    
}



// send messages 
exports.SendMessage =(req, res)=>{
    const _id = req.params.id
    const {
            sender,
            receiver,
            content,
            messagetype,
            timestamp
        } = req.body
    
    
    // find chat by id and add a new message content
    Chat.findByIdAndUpdate(
        {_id},
        {$push : {
            chat:{
                sender,
                receiver,
                content,
                messagetype,
                timestamp
            }
        }}
    ).exec()
    .then(result=>{
        res.status(200).json({
            message: 'sent'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })

}


//get message between 2 users (patient and doctor)
//[0] = doctorid
//[1] = userid
exports.getMessage=(req, res)=>{
    const id = req.params.id
    const doctorId = id.split('_')[0]
    const userId = id.split('_')[1]


    Chat.find({doctorId, userId})
    .exec()
    .then(chat =>{
        if(chat.length > 0){
            res.status(200).json({
                data: chat
            })
        }else{
            res.status(200).json({
                data: []
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            message: err
        })
    })

}