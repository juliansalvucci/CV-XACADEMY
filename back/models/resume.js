'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Resume.hasMany(models.Experience, {
        foreignKey: 'resumeId'
      });
      Resume.hasMany(models.Project, {
        foreignKey: 'resumeId'
      });
      Resume.hasMany(models.Skill, {
        foreignKey: 'resumeId'
      });
      Resume.hasMany(models.Education, {
        foreignKey: 'resumeId'
      });
      Resume.belongsTo(models.User, {
        foreignKey: 'id',
        targetKey: 'id'
      });
    }
  }
  Resume.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    contactEmail: DataTypes.STRING,
    contactPhone: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Resume',
    paranoid: true,
    timestamps: true
  });
  return Resume;
};