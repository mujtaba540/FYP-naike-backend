const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subCategoryHolder', {
    subCategoryID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'SubCategories',
        key: 'subID'
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
    donationID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Donation',
        key: 'donationID'
      }
    }
  }, {
    sequelize,
    tableName: 'subCategoryHolder',
    schema: 'NaikE',
    timestamps: false
  });
};
