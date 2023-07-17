import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findRecipes } from "../../../redux/actions";
import style from "./SearchBar.module.css";

function SearchBar() {
   const [name, setName] = useState("");

   const dispatch = useDispatch();

   const handleChange = (event) => {
      setName(event.target.value);
   };

   const handlerSubmit = () => {
      dispatch(findRecipes(name));
   };

   return (
      <div className={style.searchBar_contanier}>
         <input
            className={style.input_search}
            type="search"
            onChange={handleChange}
            value={name}
            placeholder="search recipes..."
         />
         <button className={style.search_button} onClick={handlerSubmit}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="orange"
               className={style.svg_search}>
               <path
                  fillRule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clipRule="evenodd"
               />
            </svg>
         </button>
      </div>
   );
}

export default SearchBar;
