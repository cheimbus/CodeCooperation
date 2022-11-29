module.exports = function (sequelize, DataTypes) {
  require("dotenv").config();
  let user = sequelize.define(
    "user",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        onDelete: "cascade",
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      password: {
        field: "password",
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: "user",
    }
  );
  user.associate = function (models) {
    user.hasMany(models.post, {
      as: "post",
      targetKey: "id",
      foreignKey: "user_id",
    });
    user.hasMany(models.team, {
      as: "team",
      targetKey: "id",
      foreignKey: "user_id",
    });
    user.hasMany(models.applicant, {
      as: "applicant",
      targetKey: "id",
      foreignKey: "user_id",
    });
    user.hasMany(models.bookmark, {
      as: "bookmark",
      targetKey: "id",
      foreignKey: "user_id",
    });
  };

  return user;
};
