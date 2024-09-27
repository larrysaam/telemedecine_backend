const mongoose = require('mongoose')
const Consultation = require('../models/consultationModel')



// create a reservation record for a consultation
exports.CreateReserve =(req, res)=>{
    const {
            userId,
            doctorId,
            status,
            scheduledDate,
            schedule
        } = req.body

    //creating a new record object for the consultation reservation
    const consult = new Consultation({
        _id: new mongoose.Types.ObjectId(),
        userId,
        doctorId,
        status,
        scheduledDate,
        schedule
    })

    //save consultation reservetion to Mongodb collection
    consult.save()
    .then(result=>{
        res.status(200).json({
            message: 'saved',
            data: consult
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}



// edit a consultation reservation
exports.EditReserve =(req, res)=>{
    const _id = req.params.id
    const { scheduledDate, schedule } = req.body

    // find consultaion by _id and edit record
    Consultation.findByIdAndUpdate({_id}, { scheduledDate, schedule })
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'edit done'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}


// modity consulation status after it's done
exports.ModifyStatus =(req, res)=>{
    const _id = req.params.id
    const status = 'done'

    // find consultaion by _id and edit status record
    Consultation.findByIdAndUpdate({_id}, { status })
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'edit done'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}



// get all consultations made to a doctor with id
exports.getDoctorConsult = (req, res)=>{
    const doctorId = req.params.id

    // get all records with specific doctorId
    Consultation.find({doctorId}).exec()
    .then(consults=>{
        res.status(200).json({
            data: consults,
            message: 'gotten'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}


// user gets all his consultation records 
exports.getConsult =(req, res)=>{
    const userId = req.params.id

    // get all records with specific userId
    Consultation.find({userId}).exec()
    .then(consults=>{
        res.status(200).json({
            data: consults,
            message: 'gotten'
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })

}