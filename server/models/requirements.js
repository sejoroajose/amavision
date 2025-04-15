const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Job = require('./job') 

const Requirement = sequelize.define(
  'Requirement',
  {
    jobId: {
      type: DataTypes.UUID,
      references: {
        model: Job,
        key: 'id',
      },
      allowNull: false, 
    },
    requirement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
)

Job.hasMany(Requirement, { foreignKey: 'jobId' })
Requirement.belongsTo(Job, { foreignKey: 'jobId' })

module.exports = Requirement
