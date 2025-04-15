module.exports = (sequelize, DataTypes) => {
    const Checklist = sequelize.define("checklist", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Checklist;
};