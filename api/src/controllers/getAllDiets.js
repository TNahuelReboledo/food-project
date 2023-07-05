const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Diet } = require("../db");

const URL = `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`;

const getAllDiets = async (req, res) => {
   try {
      const dietsExist = await Diet.findAll();

      if (dietsExist.length > 0) {

         res.status(200).json(dietsExist)

      } else {
         const { data } = await axios.get(URL);

         //se obtienen todas las dietas
         const allDiets = data.results.map((recipe) => recipe.diets);

         //se crea un unico array a partir del anterior
         const allDietSimpleArr = allDiets.flat();

         //seteamos los datos del array 'allDietSimpleArr'
         const uniqueDiets = [...new Set(allDietSimpleArr)];

         const dietsObj = uniqueDiets.map((diet) => ({ name: diet }));

         await Diet.bulkCreate(dietsObj);

         const dietsDB = await Diet.findAll()

         res.status(200).json(dietsDB);
      }
   } catch (error) {
      res.status(400).json(error.message);
   }
};

module.exports = { getAllDiets };
