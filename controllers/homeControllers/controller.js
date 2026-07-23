const { where, Op } = require('sequelize')
const {Appointment,AppointmentSymptom,Doctor,Profile,Specialization,Symptom,User} = require('../../models/index')


class Controller {
    static async home(req,res){
        try {
            const doctors = await Doctor.getAllDoctors()
            res.render('home')
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

}

module.exports = Controller