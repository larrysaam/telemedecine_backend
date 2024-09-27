const express = require('express')
const router = express.Router()
const ConsultationControl = require('../controllers/consultation')


// schedule a consultation
router.post('/', ConsultationControl.CreateReserve)

// edit consultation
router.patch('/:id', ConsultationControl.EditReserve)

// modify consultation status
router.patch('/status/:id', ConsultationControl.ModifyStatus)

// doctor get all consultaions
router.get('/doctor/:id', ConsultationControl.getDoctorConsult)

//user get his consultations
router.get('/user/:id', ConsultationControl.getConsult)

module.exports = router