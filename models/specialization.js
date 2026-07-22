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
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialization',
  });
  return Specialization;
};