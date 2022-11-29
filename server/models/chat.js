const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const chat = sequelize.define(
    "chat",
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
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "chat",
      timestamps: true,
      underscored: true,
    }
  );
  chat.associate = function (models) {
    chat.belongsTo(models.user, { foreignKey: "user_id" });
    chat.belongsTo(models.post, { foreignKey: "post_id" });
  };
  return chat;
};
