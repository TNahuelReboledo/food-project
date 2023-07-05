const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

const recipeById = async (req, res) => {
   try {
      const { idRecipe } = req.params;

      const regexUUIDV4 =
         /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

      if (regexUUIDV4.test(idRecipe)) {
         // if (idRecipe.includes("-")) {
         const recipeDB = await Recipe.findByPk(idRecipe,{
            include: {
               model: Diet,
               attributes: ["name"],
               through:{ 
                  attributes: []
               }
            }
         });

            res.status(200).json(recipeDB);

      } else {

         const { data } = await axios.get(
            `https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}`
         );

         const recipeFindInApi = {
            id: data.id,
            name: data.title,
            image: data.image,
            summary: data.summary,
            healthScore: data.healthScore,
            steps: data.analyzedInstructions.map((instruction) =>
               instruction.steps.map((steps) => steps.step)
            ),

            //* hacer que cada dieta venga en formato key: value ===> name: {diet}

            diets: data.diets,
         };

         res.status(200).json(recipeFindInApi);
      }
   } catch (error) {
      res.status(400).json(error.message);
   }
};

module.exports = { recipeById };
