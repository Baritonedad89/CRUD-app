module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    text: DataTypes.TEXT
  });
  return Entry;
};
