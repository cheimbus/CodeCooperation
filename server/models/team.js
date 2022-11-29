const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const team = sequelize.define(
    "team",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "cascade",
        references: {
          model: "user",
          key: "id",
        },
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "cascade",
        references: {
          model: "post",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "team",
      timestamps: false,
      underscored: true,
    }
  );
  team.associate = function (models) {
    team.belongsTo(models.user, { foreignKey: "user_id" });
    team.belongsTo(models.post, { foreignKey: "post_id" });
  };
  return team;
};
