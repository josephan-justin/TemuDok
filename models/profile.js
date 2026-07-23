'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User)
    }
    getBirthDate() {
      const rawValue = this.getDataValue('birthDate')
      return rawValue ? rawValue.toISOString().split('T')[0] : null
    }
  }
  Profile.init({
    fullName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};