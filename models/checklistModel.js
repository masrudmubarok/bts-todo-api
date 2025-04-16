const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Checklist = sequelize.define("Checklist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "checklists",
  timestamps: true,
});

module.exports = Checklist;