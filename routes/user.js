const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')
const {isLoggedIn, isUser} = require('../middlewares/auth')

router.get('/register', UserController.getRegister)
router.post('/register', UserController.postRegister)
router.get('/login', UserController.getLogin)
router.post('/login', UserController.postLogin)
router.get('/logout', UserController.logout)

// Profile
router.get('/profile', isLoggedIn, isUser, UserController.showProfile)
router.get('/profile/edit', isLoggedIn, isUser, UserController.getEditProfile)
router.post('/profile/edit', isLoggedIn, isUser, UserController.postEditProfile)

module.exports = router