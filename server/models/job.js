const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Job = sequelize.define(
  'Job',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Application Open', 'Application Closed'),
      defaultValue: 'Application Open',
    },
    postedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    applicationUrl: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    timestamps: true,
  }
)

module.exports = Job
