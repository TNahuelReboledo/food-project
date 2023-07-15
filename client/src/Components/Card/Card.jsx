import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

function Card({ name, image, diets, id }) {
   return (
      <>
         <NavLink className={style.text_to_details} to={`/detail/${id}`}>
            <div className={style.card}>
               <div className={style.card_title}>{name}</div>
               <img className={style.img_card} src={image} alt="food Image" />
               <div className={style.diets_title}>Diets:</div>
               <div className={style.diets_list}>
                  {diets.map((diet) => {
                     return <div className={style.diet_name}>{diet.name}</div>;
                  })}
               </div>
               <div className={style.go_corner}>
                  <div className={style.go_arrow}>→</div>
               </div>
            </div>
         </NavLink>
      </>
   );
}

export default Card;
