const mongoose = require('mongoose')
const Schedule = require('../models/scheduleModel')
const scheduleModel = require('../models/scheduleModel')


// create a schedule
exports.CreateSchedule = (req, res)=>{
    const {days, doctorId} = req.body

    const sched = new Schedule({
        _id: new mongoose.Types.ObjectId(),
        doctorId,
        availability: [days]
    })

    //save create speciality to Mongodb collection
    sched.save()
    .then(result=>{
        res.status(200).json({
            message: 'saved',
            data: sched
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}


// edit a schedule time and date
exports.EditSchedule =(req, res)=>{
    const _id = req.params.id
    const availability =  req.body.availability

    Schedule.findByIdAndUpdate({_id}, {availability})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'edit done'
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message: err
            }
        })
    })
}


//get doctor schedule
exports.getSchedule =(req, res)=>{
    const _id = req.params.id

    Schedule.findById({_id})
    .exec()
    then(shed =>{
        if(shed.length > 0){
            res.status(200).json({
                data: shed
            })
        }
        else{
            res.status(200).json({
                data: []
            })
        }
    })
    .catch(err=>{
        res.status(500).json({
            error:{
                message: err
            }
        })
    })
}