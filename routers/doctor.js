const Controller = require('../controllers/doctorControllers/controller')
const router = require('express').Router()


router.get('/', Controller.doctor)
router.get('/appointment/done/:appId/:docId', Controller.done)
router.get('/appointment/:docId', Controller.doctorAppointment)





module.exports = router