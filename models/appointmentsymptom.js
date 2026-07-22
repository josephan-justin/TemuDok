'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppointmentSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AppointmentSymptom.belongsTo(models.Appointment)
      AppointmentSymptom.belongsTo(models.Symptom)
    }
  }
  AppointmentSymptom.init({
    AppointmentId: DataTypes.INTEGER,
    SymptomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AppointmentSymptom',
  });
  return AppointmentSymptom;
};