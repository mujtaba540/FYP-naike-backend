const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Reports', {
    reportsID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    needID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Need',
        key: 'needID'
      }
    },
    userID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'UserDetails',
        key: 'userID'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Reports',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "Reports_pkey",
        unique: true,
        fields: [
          { name: "reportsID" },
        ]
      },
    ]
  });
};
