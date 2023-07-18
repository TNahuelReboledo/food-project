import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Landing.module.css";
import food from "../../assets/food-landing.png";

function Landing() {
   return (
      <div className={style.landing_container}>
         <div className={style.title_container}>
            <div className={style.areU_title}>ARE YOU</div>
            <div className={style.hungry_title}>HUNGRY?</div>
         </div>
         <img className={style.food_image} src={food} alt={food} />
         <NavLink to="/home">
            <button className={style.button_to_home}>
               <span>
                  go home...
               </span>
            </button>
         </NavLink>
      </div>
   );
}

export default Landing;
