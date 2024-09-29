const mongoose = require('mongoose')
const User = require('../models/userModel')


//signup new user
exports.Signup = (req, res)=>{
    console.log(req.body)
    const {
        username,
        email,
        phone,
    } = req.body

        

    User.find({"email": email}).exec()
    .then(users=>{
        if(users.length >= 1){
            res.status(409).json({
                error:{
                    message: 'Mail exists'
                }
            })
        }else{
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                title: '',
                location: 'yaounde',
                email,
                phone,
                speciality: '',
                description: '',
                review: []
            })
            user.save()
            .then(result=>{
                res.status(200).json({
                    
                    message: 'signed up'
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
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:{
                message: err
            }
        })
    })
}



// get a user by email
exports.getUser=(req, res)=>{
    const email = req.params.email
    console.log(email)

    User.find({email})
    .exec()
    .then(user=>{
        if(user.length > 0){
            res.status(200).json({
                data: user,
                message: 'done'
            })
        }else{
            res.status(200).json({
                data: [],
                message: 'empty'
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


//edit user profile 

exports.EditUser = (req, res)=>{
    const _id = req.params.id
    const {
        title, 
        location,
        phone, 
        speciality, 
        description
    } = req.body

    console.log(req.params.id)
    console.log(req.body)

    User.findByIdAndUpdate(
        {_id}, 
        {title, location, phone, speciality, description}
    ).exec()
    .then(data=>{
        res.status(200).json({
            data:data, 
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



// get all accounts under a particular speciality

exports.AllAcounts =(req, res)=>{
    const speciality = req.params.speciality

    User.find({speciality})
    .exec()
    .then((accounts)=>{
        res.status(200).json({
            data: accounts,
            message: 'edite done'
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



//get all doctors
exports.getAllDoctors=(req, res)=>{

    User.find({title: "doctor"})
    .exec()
    .then((accounts)=>{
        res.status(200).json({
            data: accounts,
            message: 'edite done'
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



// delete user account

exports.DeleteAccount =(req, res)=>{
    const _id = req.params.id

    User.deleteById({_id})
    .exec()
    .then(result=>{
        res.status(200).json({
            message: 'Deleted'
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