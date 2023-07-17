import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

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
      <div className={style.detail_loader_container}>
         {recipe.id ? (
            <div className={style.detail_recipes_container}>
               <div className={style.card}>
                  <img
                     className={style.img_recipe}
                     src={recipe.image}
                     alt={recipe.image}
                  />
                  <div className={style.card__content}>
                     <p className={style.card__title}>
                        {recipe.name} <br /> Id: {recipe.id}
                     </p>
                     <p className={style.card__description}>
                        <p dangerouslySetInnerHTML={{ __html: recipe.summary }}/>
                     Health Score: {recipe.healthScore}
                     <div className={style.diets_recipes_container}>
                        Diets:{" "}
                        {recipe.diets.every(
                           (element) => typeof element === "object"
                        )
                           ? recipe.diets.map((diet) => <div>{diet.name}</div>)
                           : recipe.diets.map((diet) => <div>{diet}</div>)}
                     </div>
                     </p>
                  </div>
               </div>

               <div className={style.no_image_detail_container}>
                  <div className={style.steps_recipe}>
                     Steps:{" "}
                     {Array.isArray(recipe.steps[0])
                        ? recipe.steps[0].map((step) => <p>&#x1f449;{step} <br /></p>)
                        : recipe.steps.map((step) => <p>{step} <br /></p>)}
                  </div>
               </div>
            </div>
         ) : (
            <div className={style.loader_container}>
               <div className={style.wrapper}>
                  <div className={style.circle}></div>
                  <div className={style.circle}></div>
                  <div className={style.circle}></div>
                  <div className={style.shadow}></div>
                  <div className={style.shadow}></div>
                  <div className={style.shadow}></div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Detail;
