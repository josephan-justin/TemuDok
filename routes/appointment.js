const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

const AppointmentController = require('../controllers/appointmentController')
const { isLoggedIn, isUser } = require('../middlewares/auth')

router.use(isLoggedIn, isUser)

router.get('/', AppointmentController.showAppointments)

// Pilih gejala
router.get('/symptoms', AppointmentController.showSymptoms)

// Cari dokter by gejala
router.post('/symptoms', AppointmentController.findDoctors)

// Booking
router.get('/book/:doctorId', AppointmentController.getBookAppointment)
router.post('/book/:doctorId', AppointmentController.postBookAppointment)

// Reschedule
router.get('/:id/edit', AppointmentController.getEditAppointment)
router.post('/:id/edit', AppointmentController.postEditAppointment)

// Cancel
router.get('/:id/cancel', AppointmentController.cancelAppointment)

module.exports = router