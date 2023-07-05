const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");


const URL = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`;

const getAllRecipes = async (req, res) => {
   try {
      //Puede o no recibirlo;
      const { name } = req.query;

      //en este array se van a guardar todas las recetas para facilitar el fitrado por nombre;
      let recipesApi = [];

      const { data } = await axios.get(URL);

      const allRecipes = data.results.map(
         (recipe) =>
            (recipe = {
               id: recipe.id,
               name: recipe.title,
               image: recipe.image,
               summary: recipe.summary,
               healthScore: recipe.healthScore,
               steps: recipe.analyzedInstructions.map((instruction) =>
                  instruction.steps.map((steps) => steps.step)
               ),
            })
      );

      recipesApi.push(...allRecipes);

      const recipesDB = await Recipe.findAll();

      const recipesDBandApi = [...recipesApi, ...recipesDB]

      if (name) {
         const recipesFiltered = recipesDBandApi.filter((recipe) =>
            recipe.name.toUpperCase().includes(name.toUpperCase())
         );

         if (recipesFiltered.length !== 0) {

            res.status(200).json(recipesFiltered);

         } else {

            res.status(404).json(`Not found ${name}`);

         }

      } else {
         res.status(200).json(recipesDBandApi);
      }
   } catch (error) {
      res.status(400).json(error.message);
   }
};

module.exports = { getAllRecipes };
