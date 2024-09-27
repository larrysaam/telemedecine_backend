const mongoose = require('mongoose')
const Speciality = require('../models/specialityModel')


// create doctor speciality list
exports.CreateSpeciality = (req, res)=>{
    const spec = req.body.speciality

    //speciality collection object
    const speciality = new Speciality({
        _id: new mongoose.Types.ObjectId(),
        speciality: spec
    })

    //save create speciality to Mongodb collection
    speciality.save()
    .then(result=>{
        res.status(200).json({
            message: 'saved',
            data: speciality
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: err
        })
    })
}