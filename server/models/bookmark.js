const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const bookmark = sequelize.define(
    "bookmark",
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
      tableName: "bookmark",
      timestamps: false,
      underscored: true,
    }
  );
  bookmark.associate = function (models) {
    bookmark.belongsTo(models.user, { foreignKey: "user_id" });
    bookmark.belongsTo(models.post, { foreignKey: "post_id" });
  };
  return bookmark;
};
