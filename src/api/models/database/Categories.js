const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Categories', {
    categoryID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    createdOn: {
      type: DataTypes.TIME,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    modifiedOn: {
      type: DataTypes.TIME,
      allowNull: true
    },
    modifiedBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletedOn: {
      type: DataTypes.TIME,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Categories',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "categoryID",
        unique: true,
        fields: [
          { name: "categoryID" },
        ]
      },
    ]
  });
};
