import {
   GET_ALL_RECIPES,
   GET_RECIPE_BY_NAME,
   RECIPES_ALPHABETIC_ORDER,
   RECIPES_HS_ORDER,
   GET_ALL_DIETS,
   RECIPES_FILTER_DIETS,
   RECIPE_BY_STORAGE_PLACE,
} from "./actions";

const initialState = {
   recipes: [],
   diets: [],
};

const reducer = (state = initialState, action) => {
   const recipesCopy = [...state.recipes];
   switch (action.type) {
      case GET_ALL_RECIPES:
         return { ...state, recipes: action.payload };

      case GET_ALL_DIETS:
         return { ...state, diets: action.payload };

      case GET_RECIPE_BY_NAME:
         return { ...state, recipes: action.payload };

      case RECIPES_ALPHABETIC_ORDER:
         return {
            ...state,
            recipes:
               action.payload === "A"
                  ? recipesCopy.sort((a, b) => a.name.localeCompare(b.name))
                  : recipesCopy.sort((a, b) => b.name.localeCompare(a.name)),
         };

      case RECIPES_HS_ORDER:
         return {
            ...state,
            recipes:
               action.payload === "min"
                  ? recipesCopy.sort((a, b) => a.healthScore - b.healthScore)
                  : recipesCopy.sort((a, b) => b.healthScore - a.healthScore),
         };

      case RECIPES_FILTER_DIETS:
         return {
            ...state,
            recipes: recipesCopy.filter((recipe) =>
               recipe.diets.some((diet) => diet.name === action.payload)
            ),
         };

      case RECIPE_BY_STORAGE_PLACE:
         if (action.payload === "api") {
            return {
               ...state,
               recipes: recipesCopy.filter((recipe) =>
                  Number(recipe.id)
               ),
            };
         } else if(action.payload === "db"){
            return {
               ...state,
               recipes: recipesCopy.filter((recipe) =>
                  isNaN(recipe.id)
               ),
            };
         }else{
            return {
               ...state,
               ...recipes
            }
         }

      default:
         return { ...state };
   }
};

export default reducer;
