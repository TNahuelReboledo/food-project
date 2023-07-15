import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

function CardsContainer() {
   const recipes = useSelector((state) => state.recipes);
   const [currentPage, setCurrentPage] = useState(0);
   const itemsPerPage = 9;
   const startIndex = currentPage * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const items = recipes.slice(startIndex, endIndex);

   const prevHandler = () => {
      setCurrentPage((prevPage) => prevPage - 1);
   };

   const nextHandler = () => {
      setCurrentPage((prevPage) => prevPage + 1);
   };

   useEffect(() => {
      setCurrentPage(0);
   }, [recipes]);

   return (
      <div>
         <div className={style.cards_container}>
            {items.map((recipe) => {
               return (
                  <Card
                     key={recipe.id}
                     id={recipe.id}
                     name={recipe.name}
                     image={recipe.image}
                     diets={recipe.diets}
                  />
               );
            })}
         </div>

            <button onClick={prevHandler} disabled={currentPage === 0}>
               Previous
            </button>
            <button onClick={nextHandler} disabled={endIndex >= recipes.length}>
               Next
            </button>
      </div>
   );
}

export default CardsContainer;
