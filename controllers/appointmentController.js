const { Appointment, AppointmentSymptom, Doctor, Specialization, Symptom, User } = require('../models')
const { Op } = require('sequelize')
const nodemailer = require('nodemailer')
const formatStatus = require('../helpers/formatSatus')

class AppointmentController {

  static async showAppointments(req, res) {
        try {
        const appointments = await Appointment.findAll({
            where: {
            UserId: req.session.userId
            },
            include: [
            {
                model: Doctor,
                include: [Specialization]
            },
            {
                model: Symptom
            }
            ],
            order: [
            ['appointmentDate', 'ASC']
            ]
        })

        res.render('appointments/index', {appointments, formatStatus})
        } catch (error) {
        res.send(error)
        }
  }

  static async showSymptoms(req, res) {
        try {
            const symptoms = await Symptom.findAll({
            include: Specialization,
            order: [['name', 'ASC']]
            })

            res.render('appointments/symptoms', { symptoms })
        } catch (error) {
            res.send(error)
        }
    }

    static async findDoctors(req, res) {
        try {
            let { symptomIds } = req.body

            if (!symptomIds) {
            return res.redirect('/appointments/symptoms')
            }

            // Kalo cuma pilih 1,
            // ubah menjadi array
            if (!Array.isArray(symptomIds)) {
            symptomIds = [symptomIds]
            }

            const symptoms = await Symptom.findAll({
            where: {
                    id: {
                    [Op.in]: symptomIds
                    }
                }
            })

            const specializationIds = symptoms.map(el => {
            return el.SpecializationId
            })

            const doctors = await Doctor.findAll({
            where: {
                SpecializationId: {
                [Op.in]: specializationIds
                }
            },
            include: Specialization
            })

            res.render('appointments/doctors', {
            doctors,
            symptomIds
            })

        } catch (error) {
            res.send(error)
        }
    }

    static async getBookAppointment(req, res) {
        try {
            const { doctorId } = req.params
            const { symptomIds } = req.query

            const doctor = await Doctor.findByPk(doctorId, {
            include: Specialization
            })

            const symptoms = await Symptom.findAll({
            where: {
                id: {
                [Op.in]: symptomIds.split(',')
                }
            }
            })

            res.render('appointments/book', {
            doctor,
            symptoms,
            symptomIds
            })

        } catch (error) {
            res.send(error)
        }
    }

    static async postBookAppointment(req, res) {
        try {
            const { doctorId } = req.params
            const { appointmentDate, complaint, symptomIds } = req.body

            const appointment = await Appointment.create({
            appointmentDate,
            complaint,
            status: 'pending',
            UserId: req.session.userId,
            DoctorId: doctorId
            })

            const symptoms = symptomIds.split(',')

            const data = symptoms.map(symptomId => {
            return {
                    AppointmentId: appointment.id,
                    SymptomId: symptomId
                }
            })

            await AppointmentSymptom.bulkCreate(data)

            // Ambil data user dan doctor untuk email
            const user = await User.findByPk(req.session.userId)
            const doctor = await Doctor.findByPk(doctorId)

            // Konfigurasi email
            const transporter = nodemailer.createTransport({
            service: 'gmail',
                auth: {
                    user: 'akun anda',
                    pass: 'passnodemailer'
                }
            })

            // Kirim email
            await transporter.sendMail({
                from: 'emailkamu@gmail.com',
                to: user.email,
                subject: 'Konfirmasi Appointment TemuDok',
                text: `
                        Appointment Anda berhasil dibuat.

                        Dokter: ${doctor.name}
                        Tanggal: ${appointmentDate}
                        Keluhan: ${complaint}
                        Status: Pending

                        Terima kasih telah menggunakan TemuDok.
                    `
            })

            res.redirect('/appointments')

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async getEditAppointment(req, res) {
        try {
            const { id } = req.params

            const appointment = await Appointment.findOne({
            where: {
                id,
                UserId: req.session.userId
            },
            include: [
                {
                model: Doctor,
                include: [Specialization]
                }
            ]
            })

            if (!appointment) {
            return res.redirect('/appointments')
            }

            res.render('appointments/edit', { appointment })

        } catch (error) {
            res.send(error)
        }
    }
    static async postEditAppointment(req, res) {
        try {
            const { id } = req.params
            const { appointmentDate, complaint } = req.body

            await Appointment.update(
            {
                appointmentDate,
                complaint
            },
            {
                where: {
                id,
                UserId: req.session.userId
                }
            }
            )

            res.redirect('/appointments')

        } catch (error) {
            res.send(error)
        }
    }

    static async cancelAppointment(req, res) {
        try {
            const { id } = req.params

            const appointment = await Appointment.findOne({
            where: {
                id,
                UserId: req.session.userId
            }
            })

            if (!appointment) {
            return res.redirect('/appointments')
            }

            await AppointmentSymptom.destroy({
            where: {
                AppointmentId: id
            }
            })

            await appointment.destroy()

            res.redirect('/appointments')

        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AppointmentController