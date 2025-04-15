const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const slugify = require('slugify')

const News = sequelize.define(
  'News',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fullContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    author_portfolio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (news) => {
        let slug = slugify(news.title, { lower: true, strict: true })
        let counter = 0
        let uniqueSlug = slug

        while (true) {
          const existing = await News.findOne({ where: { slug: uniqueSlug } })
          if (!existing) break
          counter++
          uniqueSlug = `${slug}-${counter}`
        }

        news.slug = uniqueSlug
      },
    },
  }
)

module.exports = News
