const { where, Op } = require('sequelize')
const {Appointment,AppointmentSymptom,Doctor,Profile,Specialization,Symptom,User} = require('../../models/index')


class Controller {
    static async home(req,res){
        try {
            res.render('home')
            
        } catch (error) {
            
            
            res.send(error)
        }
    }

}


module.exports = Controller