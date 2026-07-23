'use strict';
const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile)
      User.hasMany(models.Appointment)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg: 'Email already registered!'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Email Required!'
        },
        notEmpty: {
          args: true,
          msg: 'Email Required!'
        },
        isEmail:{
          msg: 'Invalid Email Format!'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password Required!'
        },
        notEmpty: {
          args: true,
          msg: 'Password Required!'
        },
        len: {
          args: [5],
          msg: 'Password must be at least 5 characters!'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role Required!'
        },
        notEmpty: {
          args: true,
          msg: 'Role Required!'
        },
        isIn: {
          args: [['user', 'doctor', 'admin']],
          msg: 'Invalid Role!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user){
        const salt = bcrypt.genSaltSync(10)
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  return User;
};