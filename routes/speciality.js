const express = require('express')
const router = express.Router()
const SpecialityControl = require('../controllers/speciality')


// create a speciality
router.post('/', SpecialityControl.CreateSpeciality)

// get all speciality
router.get('/', SpecialityControl.getAllSpeciality)


module.exports = router