const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monumentos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ciudad_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ciudades',
        key: 'id'
      }
    },
    'añoConstruccion': {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'monumentos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ciudad_id",
        using: "BTREE",
        fields: [
          { name: "ciudad_id" },
        ]
      },
    ]
  });
};
