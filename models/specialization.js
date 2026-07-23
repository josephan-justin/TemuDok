'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialization.hasMany(models.Doctor)
      Specialization.hasMany(models.Symptom)
    }
  }
  Specialization.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull: { msg: 'Name is required' },
        notEmpty: { msg: 'Name is required' },
      }
    }
  }, {
    sequelize,
    modelName: 'Specialization',
  });
  return Specialization;
};