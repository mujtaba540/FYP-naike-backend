const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SubCategories', {
    subCategoryID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    categoryID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'categoryID'
      }
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    unit: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    maxLimit: {
      type: DataTypes.BIGINT,
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
    tableName: 'SubCategories',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "subID",
        unique: true,
        fields: [
          { name: "subCategoryID" },
        ]
      },
    ]
  });
};
