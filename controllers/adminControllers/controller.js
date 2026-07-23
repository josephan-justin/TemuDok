const { where, Op } = require('sequelize')
const {Appointment,AppointmentSymptom,Doctor,Profile,Specialization,Symptom,User} = require('../../models/index')


class Controller {

    static async admin(req,res){
        try {
            const {error,name,deleted} = req.query
            let query = {
                order : ["id"],
                where : {}
            }

            if (name) {
                query.where.name = {
                    [Op.iLike] : `%${name}%`
                }
            }

            let data = await Specialization.findAll(query)
            res.render('./adminViews/admin',{data,error,deleted})
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }


    static async postAddSpecialization(req,res){
        try {
            // res.render('admin',{data})
            // res.send(req.body)
            const {name} = req.body
            await Specialization.create({
                name
            })
            res.redirect('/admin')
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                error = error.errors.map(el => el.message)
                res.redirect (`/admin?error=${error}`)
            }
            res.send(error)
        }
    }

    static async deleteSpecialization(req,res){
        try {
            // res.send('test')
            const {specId} = req.params
            // console.log(id);
            
            let idToDelete = await Specialization.findByPk(specId)
            await idToDelete.destroy()
            res.redirect(`/admin?deleted=The specialization named ${idToDelete.name} has been deleted `)
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async doctorListAdmin(req,res){
        try {
            const {specId} = req.params
            const {deleted} = req.query 

            let data = await Doctor.findAll({
                include : [Specialization],
                where : {
                    SpecializationId : specId
                }
            })
            // res.send(data)
            res.render('./adminViews/doctorListAdmin',{data,specId,deleted})
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async deleteDoctor(req,res){
        try {
            // res.send('test')
            const {specId,docId} = req.params
            console.log(specId,docId);
            
            let idToDelete = await Doctor.findByPk(docId)
            await idToDelete.destroy()
            res.redirect(`/admin/specialization/doctor/${specId}?deleted=${idToDelete.name} has been deleted `)
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async symptomListAdmin(req,res){
        try {
            const {specId} = req.params
            const {error,search,info} = req.query 

            let query = {
                include : [Specialization],
                where : {
                    SpecializationId : specId
                }
            }

            if (search) {
                query.where.name = {
                    [Op.iLike] : `%${search}%`
                }
                
            }

            let data = await Symptom.findAll(query)
            // res.send(data)
            
            res.render('./adminViews/symptomListAdmin',{data,specId,error,info})
            
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async addSymptom(req,res){
        const {specId} = req.params
        try {
            const {name} = req.body
            await Symptom.create({
                name,
                SpecializationId : specId
            })
            res.redirect(`/admin/specialization/symptom/${specId}`)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                error = error.errors.map(el => el.message)
                res.redirect (`/admin/specialization/symptom/${specId}?error=${error}`)
            }
            res.send(error)
        }
    }

    static async getdoctorAdd(req,res){
        const {specId} = req.params
        const {error} = req.query

        try {
            res.render('./adminViews/addDoctor',{specId,error})
        } catch (error) {
            res.send(error)
        }

    }

    static async postdoctorAdd(req,res){
        const {specId} = req.params
        try {
            if (!req.file) {
                throw { name: 'custom', message: 'image required' }
            }
            const {path} = req.file
            const {name,imageUrl} = req.body
            await Doctor.create({
                name,
                imageUrl : path,
                SpecializationId : specId
            })
            res.redirect(`/admin/specialization/doctor/${specId}`)

            
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                error = error.errors.map(el => el.message)
                res.redirect (`/admin/specialization/doctor/${specId}/add?error=${error}`)
            }else if (error.name === 'custom' ){
                error = error.message
                res.redirect (`/admin/specialization/doctor/${specId}/add?error=${error}`)

            }
        }

    }

    static async delSymptom(req,res){
        const {specId,simId} = req.params
        try {
            let toDel = await Symptom.findByPk(simId)
            await toDel.destroy()
            res.redirect(`/admin/specialization/symptom/${specId}?info= symptomp named ${toDel.name} has been deleted`)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                error = error.errors.map(el => el.message)
                res.redirect (`/admin/specialization/symptom/${specId}?error=${error}`)
            }
            console.log(error);
            
            res.send(error)
        }
    }


    
}


module.exports = Controller