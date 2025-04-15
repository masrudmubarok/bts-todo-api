module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define("item", {
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
    return Item;
  };