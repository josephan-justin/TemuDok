'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Symptom.belongsTo(models.Specialization)
      Symptom.belongsToMany(models.Appointment, {
        through: models.AppointmentSymptom
      })
    }
  }
  Symptom.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: { msg: ' Symptom Name is required' },
        notEmpty: { msg: 'Symptom Name is required' },
      }
    },
    SpecializationId: DataTypes.INTEGER,
      
  }, {
    sequelize,
    modelName: 'Symptom',
  });
  return Symptom;
};