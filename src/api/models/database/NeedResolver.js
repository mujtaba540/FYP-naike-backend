const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('NeedResolver', {
    needResolverID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    resolverID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'UserDetails',
        key: 'userID'
      }
    },
    needID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Need',
        key: 'needID'
      }
    },
    currentQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    validationStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cancelationStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'NeedResolver',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "NeedResolver_pkey",
        unique: true,
        fields: [
          { name: "needResolverID" },
        ]
      },
    ]
  });
};
