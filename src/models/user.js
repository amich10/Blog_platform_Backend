const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class User extends Model {}

User.init({
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false }
}, { sequelize, modelName: "User", tableName: "users", timestamps: true });

module.exports = User;
