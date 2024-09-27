const express = require('express')
const router = express.Router()
const ScheduleControl = require('../controllers/schedule')


// create a schedule
router.post('/', ScheduleControl.CreateSchedule)

// edit a schedule
router.patch('/:id', ScheduleControl.EditSchedule)

//get doctor schedule
router.get('/:id', ScheduleControl.getSchedule)

module.exports = router