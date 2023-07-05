const { getAllRecipes } = require("../controllers/allRecipes");
const { createRecipe } = require("../controllers/createRecipe");
const { recipeById } = require("../controllers/recipeById");

const routerRecipes = require("express").Router();

routerRecipes.get("/", getAllRecipes);
routerRecipes.get("/:idRecipe", recipeById);
routerRecipes.post("/", createRecipe);

module.exports = routerRecipes;