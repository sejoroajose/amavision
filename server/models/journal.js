const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const slugify = require('slugify') 

const Journal = sequelize.define(
  'Journal',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    media: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (journal) => {
        journal.slug = slugify(journal.title, {
          lower: true, 
          strict: true, 
          trim: true, 
        })
      },
      beforeCreate: (journal) => {
        if (!Array.isArray(journal.media)) {
          journal.media = journal.media ? [journal.media] : []
        }
      },
      beforeUpdate: (journal) => {
        if (!Array.isArray(journal.media)) {
          journal.media = journal.media ? [journal.media] : []
        }
      },
    },
  }
)

module.exports = Journal
