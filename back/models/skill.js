'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsTo(models.Resume, {
        foreignKey: 'id',
        targetKey: 'id'
      })
    }
  }
  Skill.init({
    skillName: DataTypes.STRING,
    resumeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Skill',
    paranoid: true,
    timestamps: true
  });
  return Skill;
};