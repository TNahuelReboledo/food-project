import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const RECIPES_ALPHABETIC_ORDER = "RECIPES_ALPHABETIC_ORDER";
export const RECIPES_HS_ORDER = "RECIPES_HS_ORDER";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const RECIPES_FILTER_DIETS = "RECIPES_FILTER_DIETS";
export const RECIPE_BY_STORAGE_PLACE = "RECIPE_BY_STORAGE_PLACE";

export const allRecipes = () => {
   return async function (dispatch) {
      const { data } = await axios.get(`http://localhost:3001/recipes`);
      const recipes = data;
      dispatch({ type: GET_ALL_RECIPES, payload: recipes });
   };
};

export const allDiets = () => {
   return async function (dispatch) {
      const { data } = await axios.get(`http://localhost:3001/diets`);
      const diets = data;
      dispatch({ type: GET_ALL_DIETS, payload: diets });
   };
};

export const findRecipes = (name) => {
   return async function (dispatch) {
      try {
         const { data } = await axios.get(
            `http://localhost:3001/recipes?name=${name}`
         );
         const recipeByName = data;
         dispatch({ type: GET_RECIPE_BY_NAME, payload: recipeByName });
      } catch (error) {
         console.log(error.message);
         alert(error.message);
      }
   };
};

export const recipesByAlfabeticOrder = (order) => {
   return {
      type: RECIPES_ALPHABETIC_ORDER,
      payload: order,
   };
};

export const recipesOrderHealtScore = (order) => {
   return {
      type: RECIPES_HS_ORDER,
      payload: order,
   };
};

export const recipesFilteredByDiets = (diet) => {
   return {
      type: RECIPES_FILTER_DIETS,
      payload: diet,
   };
};

export const recipesByStorage = (place) => {
   return {
      type: RECIPE_BY_STORAGE_PLACE,
      payload: place
   }
}
