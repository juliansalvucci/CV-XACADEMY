'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Education.belongsTo(models.Resume, {
        foreignKey: 'id',
        targetKey: 'id'
      })
    }
  }
  Education.init({
    institution: DataTypes.STRING,
    degree: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    resumeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};