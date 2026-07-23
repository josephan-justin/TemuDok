const Controller = require('../controllers/adminControllers/controller')
const { isLoggedIn, isAdmin } = require('../middlewares/auth')
const router = require('express').Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./assets/')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage :storage})

router.use(isLoggedIn, isAdmin)

router.get('/', Controller.admin)
router.post('/add/specialization', Controller.postAddSpecialization)
router.get('/specialization/delete/doctor/:specId/:docId', Controller.deleteDoctor)
router.get('/specialization/delete/:specId', Controller.deleteSpecialization)
router.get('/specialization/doctor/:specId', Controller.doctorListAdmin)
router.get('/specialization/doctor/:specId/add', Controller.getdoctorAdd)
router.post('/specialization/doctor/:specId/add', upload.single('imageUrl'), Controller.postdoctorAdd)
router.get('/specialization/symptom/:specId', Controller.symptomListAdmin)
router.post('/specialization/symptom/:specId/add', Controller.addSymptom)




module.exports = router