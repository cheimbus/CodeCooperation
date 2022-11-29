const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const post = sequelize.define(
    "post",
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
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      start_date: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      end_date: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      stack: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      total_member: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      current_member: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      project_status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "post",
      timestamps: true,
      underscored: true,
    }
  );
  post.associate = function (models) {
    post.belongsTo(models.user, { foreignKey: "user_id" });
    post.hasMany(models.team, {
      as: "team",
      targetKey: "id",
      foreignKey: "post_id",
    });
    post.hasMany(models.applicant, {
      as: "applicant",
      targetKey: "id",
      foreignKey: "post_id",
    });
    post.hasMany(models.bookmark, {
      as: "bookmark",
      targetKey: "id",
      foreignKey: "post_id",
    });
  };
  return post;
};
