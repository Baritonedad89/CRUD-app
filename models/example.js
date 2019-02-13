module.exports = function(sequelize, DataTypes) {
  const Entry = sequelize.define("Entry", {
    author: DataTypes.STRING,
    text: DataTypes.TEXT
  });
  return Entry;
};
