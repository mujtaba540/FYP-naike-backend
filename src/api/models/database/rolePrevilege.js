const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rolePrevilege', {
    privilegeID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Privilege',
        key: 'privilegeID'
      }
    },
    roleID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'Role',
        key: 'roleID'
      }
    },
    rolePrivilegeID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    add: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    edit: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'rolePrevilege',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "rolePrevilege_pkey",
        unique: true,
        fields: [
          { name: "rolePrivilegeID" },
        ]
      },
    ]
  });
};
