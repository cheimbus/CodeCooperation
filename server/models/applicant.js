const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const applicant = sequelize.define(
    "applicant",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: "applicant",
      timestamps: false,
      underscored: true,
    }
  );
  applicant.associate = function (models) {
    applicant.belongsTo(models.user, { foreignKey: "user_id" });
    applicant.belongsTo(models.post, { foreignKey: "post_id" });
  };
  return applicant;
};
