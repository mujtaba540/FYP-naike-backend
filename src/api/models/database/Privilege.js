const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Privilege', {
    privilegeID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    menuName: {
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
    subMenuName: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Privilege',
    schema: 'NaikE',
    timestamps: false,
    indexes: [
      {
        name: "Privilege_pkey",
        unique: true,
        fields: [
          { name: "privilegeID" },
        ]
      },
    ]
  });
};
