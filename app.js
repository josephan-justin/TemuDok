const express = require('express')
const session = require('express-session')

const Controller = require('./controllers/homeControllers/controller')

const userRouter = require('./routes/user')
const routerAdmin = require('./routers/admin')
const routerDoctor = require('./routers/doctor')
const appointmentRouter = require('./routes/appointment')

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use('/assets', express.static('assets'))

app.use(session({
  secret: 'temudok-secret',
  resave: false,
  saveUninitialized: false
}))

app.use((req, res, next) => {
  res.locals.userId = req.session.userId
  res.locals.role = req.session.role
  next()
})

// Landing Page
app.get('/', Controller.home)

// User
app.use('/users', userRouter)

// Admin
app.use('/admin', routerAdmin)

// Doctor
app.use('/doctor', routerDoctor)

//Appointment
app.use('/appointments', appointmentRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})