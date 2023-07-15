import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
   const { id } = useParams();
   const [recipe, setRecipe] = useState({});

   useEffect(() => {
      axios.get(`http://localhost:3001/recipes/${id}`).then(({ data }) => {
         if (data.id) {
            setRecipe(data);
         } else {
            console.log(`Fallo al cargar los datos`);
         }
      });
   }, [id]);

   return (
      <div>
         {recipe.id ? (
            <>
               <div>Id: {recipe.id}</div>
               <div>Name: {recipe.name}</div>
               <p dangerouslySetInnerHTML={{ __html: recipe.summary }}/>
               <div>Health Score: {recipe.healthScore}</div>
               <div>Steps: {
               Array.isArray(recipe.steps[0]) ?
               recipe.steps[0].map(step=> <div>{step}</div>)
               : recipe.steps.map(step => <div>{step}</div>)
            }</div>
               <img src={recipe.image} alt={recipe.image} />
               <ul>Diets: {
               recipe.diets.every((element)=> typeof element === "object") ?
               recipe.diets.map(diet=> <li>{diet.name}</li> )
               :recipe.diets.map(diet=> <li>{diet}</li> )
               }
               </ul>
            </>
         ) : (
            <div>Loading</div>
         )}
      </div>
   );
}

export default Detail;
