const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
   // defino el modelo
   sequelize.define(
      "recipe",
      {
         id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         image: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         summary: {
            type: DataTypes.TEXT,
            allowNull: false,
         },
         healthScore: {
            type: DataTypes.DECIMAL,
            allowNull: false,
         },
         steps: {
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
         },
      },
      { freezeTableName: true, timestamps: false }
   );
};