const Controller = require('../controllers/doctorControllers/controller')
const { isLoggedIn, isDoctor } = require('../middlewares/auth')
const router = require('express').Router()


router.use(isLoggedIn, isDoctor)

router.get('/', Controller.doctor)
router.get('/appointment/done/:appId/:docId', Controller.done)
router.get('/appointment/:docId', Controller.doctorAppointment)





module.exports = router