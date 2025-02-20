var DataTypes = require("sequelize").DataTypes;
var _ciudades = require("./ciudades");
var _monumentos = require("./monumentos");

function initModels(sequelize) {
  var ciudades = _ciudades(sequelize, DataTypes);
  var monumentos = _monumentos(sequelize, DataTypes);

  monumentos.belongsTo(ciudades, { as: "ciudad", foreignKey: "ciudad_id"});
  ciudades.hasMany(monumentos, { as: "monumentos", foreignKey: "ciudad_id"});

  return {
    ciudades,
    monumentos,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
