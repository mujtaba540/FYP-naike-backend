var DataTypes = require("sequelize").DataTypes;
var _Address = require("./Address");
var _Categories = require("./Categories");
var _Donation = require("./Donation");
var _Need = require("./Need");
var _NeedResolver = require("./NeedResolver");
var _Privilege = require("./Privilege");
var _Reports = require("./Reports");
var _Role = require("./Role");
var _SubCategories = require("./SubCategories");
var _UserDetails = require("./UserDetails");
var _rolePrevilege = require("./rolePrevilege");
var _subCategoryHolder = require("./subCategoryHolder");

function initModels(sequelize) {
  var Address = _Address(sequelize, DataTypes);
  var Categories = _Categories(sequelize, DataTypes);
  var Donation = _Donation(sequelize, DataTypes);
  var Need = _Need(sequelize, DataTypes);
  var NeedResolver = _NeedResolver(sequelize, DataTypes);
  var Privilege = _Privilege(sequelize, DataTypes);
  var Reports = _Reports(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var SubCategories = _SubCategories(sequelize, DataTypes);
  var UserDetails = _UserDetails(sequelize, DataTypes);
  var rolePrevilege = _rolePrevilege(sequelize, DataTypes);
  var subCategoryHolder = _subCategoryHolder(sequelize, DataTypes);

  SubCategories.belongsTo(Categories, { as: "category", foreignKey: "categoryID"});
  Categories.hasMany(SubCategories, { as: "SubCategories", foreignKey: "categoryID"});
  Need.belongsTo(Donation, { as: "donation", foreignKey: "donationID"});
  Donation.hasMany(Need, { as: "Needs", foreignKey: "donationID"});
  subCategoryHolder.belongsTo(Donation, { as: "donation", foreignKey: "donationID"});
  Donation.hasMany(subCategoryHolder, { as: "subCategoryHolders", foreignKey: "donationID"});
  NeedResolver.belongsTo(Need, { as: "need", foreignKey: "needID"});
  Need.hasMany(NeedResolver, { as: "NeedResolvers", foreignKey: "needID"});
  Reports.belongsTo(Need, { as: "need", foreignKey: "needID"});
  Need.hasMany(Reports, { as: "Reports", foreignKey: "needID"});
  subCategoryHolder.belongsTo(Need, { as: "need", foreignKey: "needID"});
  Need.hasMany(subCategoryHolder, { as: "subCategoryHolders", foreignKey: "needID"});
  rolePrevilege.belongsTo(Privilege, { as: "privilege", foreignKey: "privilegeID"});
  Privilege.hasMany(rolePrevilege, { as: "rolePrevileges", foreignKey: "privilegeID"});
  UserDetails.belongsTo(Role, { as: "role", foreignKey: "roleID"});
  Role.hasMany(UserDetails, { as: "UserDetails", foreignKey: "roleID"});
  rolePrevilege.belongsTo(Role, { as: "role", foreignKey: "roleID"});
  Role.hasMany(rolePrevilege, { as: "rolePrevileges", foreignKey: "roleID"});
  Donation.belongsTo(SubCategories, { as: "subCategory", foreignKey: "subCategoryID"});
  SubCategories.hasMany(Donation, { as: "Donations", foreignKey: "subCategoryID"});
  Need.belongsTo(SubCategories, { as: "subcategory", foreignKey: "subcategoryID"});
  SubCategories.hasMany(Need, { as: "Needs", foreignKey: "subcategoryID"});
  subCategoryHolder.belongsTo(SubCategories, { as: "subCategory", foreignKey: "subCategoryID"});
  SubCategories.hasMany(subCategoryHolder, { as: "subCategoryHolders", foreignKey: "subCategoryID"});
  Address.belongsTo(UserDetails, { as: "user", foreignKey: "userID"});
  UserDetails.hasMany(Address, { as: "Addresses", foreignKey: "userID"});
  Donation.belongsTo(UserDetails, { as: "user", foreignKey: "userID"});
  UserDetails.hasMany(Donation, { as: "Donations", foreignKey: "userID"});
  Need.belongsTo(UserDetails, { as: "user", foreignKey: "userID"});
  UserDetails.hasMany(Need, { as: "Needs", foreignKey: "userID"});
  NeedResolver.belongsTo(UserDetails, { as: "resolver", foreignKey: "resolverID"});
  UserDetails.hasMany(NeedResolver, { as: "NeedResolvers", foreignKey: "resolverID"});
  Reports.belongsTo(UserDetails, { as: "user", foreignKey: "userID"});
  UserDetails.hasMany(Reports, { as: "Reports", foreignKey: "userID"});

  return {
    Address,
    Categories,
    Donation,
    Need,
    NeedResolver,
    Privilege,
    Reports,
    Role,
    SubCategories,
    UserDetails,
    rolePrevilege,
    subCategoryHolder,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
