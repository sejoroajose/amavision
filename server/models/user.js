const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    stateOfOrigin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    professionalSummary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preferredRole: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    employmentStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentCompany: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentRole: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    noticePeriod: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    expectedSalary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    willingToRelocate: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    workPreference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    education: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    certifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkedInProfile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localGovernment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cv_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatarMimeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cv: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
    cvMimeType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = User
