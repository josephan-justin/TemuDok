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

        if (user.role === 'admin') {
          res.redirect('/admin')
        } else if (user.role === 'doctor') {
          res.redirect('/doctor')
        } else {
          const returnTo = req.session.returnTo || '/appointments'
          delete req.session.returnTo
          res.redirect(returnTo)
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

  static async showProfile(req, res){
    try {
      const user = await User.findByPk(req.session.userId, {
        include : Profile
      })

      res.render('users/profile', {user})
    } catch (error) {
      res.send(error)
    }
  }

  static async getEditProfile(req, res) {
    try {
      const profile = await Profile.findOne({
        where: {
          UserId: req.session.userId
        }
      })

      res.render('users/editProfile', { profile })
    } catch (error) {
      res.send(error)
    }
  }

  static async postEditProfile(req, res) {
    try {
      const { fullName, birthDate, gender } = req.body

      await Profile.update(
        {
          fullName,
          birthDate,
          gender
        },
        {
          where: {
            UserId: req.session.userId
          }
        }
      )

      res.redirect('/users/profile')
    } catch (error) {
      res.send(error)
    }
  }

}

module.exports = UserController