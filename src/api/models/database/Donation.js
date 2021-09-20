const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Donation', {
    donationID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'UserDetails',
        key: 'userID'
      }
    },
    subCategoryID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'SubCategories',
        key: 'subCategoryID'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
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
    createdBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    modifiedOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    modifiedBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletedOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    deliveryType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    initialQuantity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currentQuantity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Donation',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "Id",
        unique: true,
        fields: [
          { name: "donationID" },
        ]
      },
    ]
  });
};
