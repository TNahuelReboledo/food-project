const { Recipe, Diet } = require("../db");

const createRecipe = async (req, res) => {
   try {
      const { name, image, summary, healthScore, steps, diets } = req.body;

      if (
         !name ||
         !image ||
         !summary ||
         !healthScore ||
         !steps ||
         !diets
      ) {
         res.status(400).json({
            error: `Faltan ingresar datos en la solicitud. Por favor, revise y envíe la información requerida.`,
         });
      } else {
         const newRecipe = {
            name,
            image,
            summary,
            healthScore,
            steps,
            diets,
         };

         const createdRecipe = await Recipe.create(newRecipe);

         const dietsFound = await Diet.findAll({
            where: {
               name: diets,
            },
         });

         await createdRecipe.addDiets(dietsFound);

         res.status(200).json(`Se creo una nueva receta`);

      }
   } catch (error) {
      res.status(400).json(error.message)
   }
};

module.exports = { createRecipe };
