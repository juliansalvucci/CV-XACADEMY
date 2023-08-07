'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Experience.belongsTo(models.Resume, {
        foreignKey: 'id',
        targetKey: 'id'
      })
    }
  }
  Experience.init({
    jobTitle: DataTypes.STRING,
    company: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    resumeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Experience',
  });
  return Experience;
};