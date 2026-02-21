const User = require("./user.model");
const Store = require("./store.model");
const Rating = require("./rating.model");

// One owner can have many stores
User.hasMany(Store, {
  foreignKey: "ownerId",
});

// One store belongs to one owner
Store.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

// Store has many ratings
Store.hasMany(Rating, {
  foreignKey: "storeId",
});

// Rating belongs to store
Rating.belongsTo(Store, {
  foreignKey: "storeId",
});

module.exports = {
  User,
  Store,
  Rating,
};