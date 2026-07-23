'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Appointment.belongsTo(models.User)
      Appointment.belongsTo(models.Doctor)

      Appointment.belongsToMany(models.Symptom, {
        through: models.AppointmentSymptom
      })
    }
    getAppointmentDate() {
      const rawValue = this.getDataValue('appointmentDate')
      return rawValue ? rawValue.toISOString().split('T')[0] : null
    }
  }
  Appointment.init({
    appointmentDate: DataTypes.DATE,
    status: DataTypes.STRING,
    complaint: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};