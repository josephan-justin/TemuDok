const bcrypt = require('bcryptjs')
const { User, Profile } = require('../models')

class UserController {
  static async getRegister(req, res) {
    try {
      res.render('users/register')
    } catch (error) {
      res.send(error)
    }
  }

  static async postRegister(req, res) {
    try {
        const {email, password, fullName, birthDate, gender} = req.body
    
        const user = await User.create({email, password, role: 'user'})
        await Profile.create({fullName, birthDate, gender, UserId: user.id})

        res.redirect('/users/login')
        
    } catch (error) {
        res.send(error)
    }
  }

  static async getLogin(req, res) {
    try {
      res.render('users/login')
    } catch (error) {
      res.send(error)
    }
  }

  static async postLogin(req, res) {
    try {
        const {email, password} = req.body
        const user = await User.findOne({
            where: {email}
        })

        if(!user){
            return res.send('Invalid email/password')
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if(!validPassword){
            return res.send('Invalid email/password')
        }

        req.session.userId = user.id
        req.session.role = user.role

        if(user.role === 'admin'){
            res.redirect('/admin')
        } else if(user.role === 'doctor'){
            res.redirect('/doctor/appointments')
        } else{
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
  }

  static async logout(req, res){
    try {
        req.session.destroy(error => {
            if(error){
                return res.send(error)
            }

            res.redirect('/')
        })
    } catch (error) {
        res.send(error)
    }
  }
}

module.exports = UserController