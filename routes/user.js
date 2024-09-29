const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user')



// signup new user
router.post('/signup', UserController.Signup)

//get a particular user by email
router.get('/:email', UserController.getUser)

// edit user profile
router.put('/:id', UserController.EditUser)

//get all doctors
router.get('/all', UserController.getAllDoctors )

// get all doctors account per speciality
router.get('/specials/:speciality', UserController.AllAcounts )

// delete user account
router.delete('/:id', UserController.DeleteAccount )


module.exports = router