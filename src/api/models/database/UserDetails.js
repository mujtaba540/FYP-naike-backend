const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserDetails', {
    userID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    roleID: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'roleID'
      }
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "email"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileDP: {
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
    dateOfBirth: {
      type: DataTypes.DATEONLY,
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
    emailChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    phoneChecked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    createdBy: {
      type: DataTypes.TEXT,
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
    }
  }, {
    sequelize,
    tableName: 'UserDetails',
    schema: 'NaikE',
    timestamps: false
  });
};
