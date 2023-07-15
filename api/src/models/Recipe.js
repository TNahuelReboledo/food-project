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
            get() {
               // Obtener las plataformas como un array
               const summaryString = this.getDataValue("summary");
               return summaryString ? summaryString.split(".") : [];
            },
            set(value) {
               // Almacenar las plataformas como un string separado por comas
               if (Array.isArray(value)) {
                  this.setDataValue("summary", value.join("."));
               } else {
                  this.setDataValue("summary", value);
               }
            },
         },
      },
      { freezeTableName: true, timestamps: false }
   );
};