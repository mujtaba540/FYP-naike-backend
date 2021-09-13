const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Need', {
    needID: {
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
    subcategoryID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'SubCategories',
        key: 'subID'
      }
    },
    donationID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Donation',
        key: 'donationID'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    needCount: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    resolveCount: {
      type: DataTypes.BIGINT,
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
    createdOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.TEXT,
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
    deletedOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    deletedBy: {
      type: DataTypes.TEXT,
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
    tableName: 'Need',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "Need_pkey",
        unique: true,
        fields: [
          { name: "needID" },
        ]
      },
    ]
  });
};
