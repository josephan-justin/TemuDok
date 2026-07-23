const express = require('express')
const session = require('express-session')
const app = express()

const userRouter = require('./routes/user')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use(session({
  secret: 'temudok-secret',
  resave: false,
  saveUninitialized: false
}))
app.use('/', userRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})