const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Item = sequelize.define("Item", {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  checklistId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "Items",
  timestamps: true,
});

module.exports = Item;