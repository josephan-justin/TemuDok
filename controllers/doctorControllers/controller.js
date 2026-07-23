const { where, Op } = require('sequelize')
const {Appointment,AppointmentSymptom,Doctor,Profile,Specialization,Symptom,User} = require('../../models/index')


class Controller {
    static async doctor(req,res){
        try {
            let data = await Doctor.findAll({
                include : [Appointment]
            })
            // res.send(data);
            res.render('./doctorViews/doctor',{data})

            
        } catch (error) {
            res.send(error)
            
        }
    }

    static async doctorAppointment(req,res){
        try {
            const{docId} = req.params
            let data = await Doctor.findByPk(docId,{
                include : [
                    {
                        model : Appointment,
                        include : [{
                            model : User,
                            include : [Profile]
                        }]
                    }],
            })
            // res.send(data);
            res.render('./doctorViews/doctorAppointment',{data})

            
        } catch (error) {
            console.log(error);
            
            res.send(error)
            
        }
    }

    static async done(req,res){
        try {
            const{appId,docId} = req.params
            await Appointment.update({
                status : "done"
            },{
                where : {
                    id : appId
                }
            })
            
            res.redirect(`/doctor/Appointment/${docId}`)

            
        } catch (error) {
            res.send(error)
            
        }
    }



}

module.exports = Controller