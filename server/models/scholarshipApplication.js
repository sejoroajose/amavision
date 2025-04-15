const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const ScholarshipApplication = sequelize.define(
  'ScholarshipApplication',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    localGovernment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredProgram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hasLaptop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0, 
    },
    quizAnswers: {
      type: DataTypes.JSON, 
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
)

module.exports = ScholarshipApplication
