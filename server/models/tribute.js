const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Tribute = sequelize.define('Tribute', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPinned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
})

module.exports = Tribute
