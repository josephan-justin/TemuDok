'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.Specialization)
      Doctor.hasMany(models.Appointment)
    }
  }
  Doctor.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: { msg: ' doctor Name is required' },
        notEmpty: { msg: 'doctor Name is required' },
      }
    },
    imageUrl: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: { msg: ' image required' },
        notEmpty: { msg: 'image required' },
      }
    },
    SpecializationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};