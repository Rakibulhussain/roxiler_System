const User = require("./user.model");
const Store = require("./store.model");
const Rating = require("./rating.model");

/*
|--------------------------------------------------------------------------
| USER ↔ STORE (Owner Relationship)
|--------------------------------------------------------------------------
*/

// One owner (User) can have many stores
User.hasMany(Store, {
  foreignKey: "ownerId",
  as: "stores",
});

// One store belongs to one owner
Store.belongsTo(User, {
  foreignKey: "ownerId",
  as: "owner",
});

/*
|--------------------------------------------------------------------------
| STORE ↔ RATING
|--------------------------------------------------------------------------
*/

// One store can have many ratings
Store.hasMany(Rating, {
  foreignKey: "storeId",
  as: "ratings",
});

// Rating belongs to a store
Rating.belongsTo(Store, {
  foreignKey: "storeId",
  as: "store",
});

/*
|--------------------------------------------------------------------------
| USER ↔ RATING
|--------------------------------------------------------------------------
*/

// One user can give many ratings
User.hasMany(Rating, {
  foreignKey: "userId",
  as: "userRatings",
});

// Rating belongs to a user
Rating.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = {
  User,
  Store,
  Rating,
};