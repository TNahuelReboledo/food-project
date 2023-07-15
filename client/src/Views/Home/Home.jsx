import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import CardsContainer from "../../Components/CardContainer/CardsContainer";
import { allRecipes } from "../../redux/actions";
import style from "./Home.module.css"

function Home() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(allRecipes());
   }, []);

   return (
      <div className={style.home}>
         <CardsContainer/>
      </div>
   );
}

export default Home;
