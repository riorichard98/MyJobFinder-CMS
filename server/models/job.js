'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsToMany(models.Skill,{through:'JobSkills',foreignKey:'jobId'})
      Job.belongsTo(models.Company,{foreignKey:'companyId'})
      Job.belongsTo(models.User,{foreignKey:'authorId'})
    }
  }
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    companyId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER,
    jobType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};