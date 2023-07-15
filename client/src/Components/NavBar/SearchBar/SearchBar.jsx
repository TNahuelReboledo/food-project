import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findRecipes } from "../../../redux/actions";
import style from "./SearchBar.module.css"

function SearchBar() {
   const [name, setName] = useState("");

   const dispatch = useDispatch();

   const handleChange = (event) => {
      setName(event.target.value);
   };

   const handlerSubmit = () => {
      dispatch(findRecipes(name))
   }

   return (
      <div className={style.searchBar_contaier}>
         <input type="search" onChange={handleChange} value={name} />
         <button onClick={handlerSubmit}>Search</button>
      </div>
   );
}

export default SearchBar;
