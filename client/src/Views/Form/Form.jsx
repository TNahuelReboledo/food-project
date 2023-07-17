import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "./Form.module.css";
import { allDiets } from "../../redux/actions";
import { NavLink } from "react-router-dom";

function Form() {
   const dispatch = useDispatch();

   const diets = useSelector((state) => state.diets);

   useEffect(() => {
      dispatch(allDiets());
   }, []);

   const [form, setForm] = useState({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      steps: [],
      diets: [],
   });

   const [errors, setErrors] = useState({
      name: "",
      image: "",
      summary: "",
      healthScore: "",
      steps: "",
      diets: "",
   });

   const handlerSubmit = async (event) => {
      event.preventDefault();
      try {
         await axios.post(`http://localhost:3001/recipes`, form);
         alert(`receta creada`);
      } catch (error) {
         alert(`No se pudo crear la receta`);
      }
   };

   const handleChangeName = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateName({ ...form, [key]: val });
   };

   const handleChangeImage = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateImage({ ...form, [key]: val });
   };

   const handleChangeSummary = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateSummary({ ...form, [key]: val });
   };

   const handleChangeHealtScore = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateHealthScore({ ...form, [key]: val });
   };

   const handleChangeSteps = (event) => {
      const val = event.target.value;
      const key = event.target.name;

      setForm({ ...form, [key]: val });
      validateSteps({ ...form, [key]: val });
   };

   const handleChecked = (event) => {
      const val = event.target.value;

      if (event.target.checked) {
         setForm((form) => ({ ...form, diets: [...form.diets, val] }));
      } else {
         const index = form.diets.indexOf(val);
         if (index > -1) {
            const updatedDiets = [...form.diets];
            updatedDiets.splice(index, 1);
            setForm({ ...form, diets: updatedDiets });
         }
      }
   };

   // Validations ==>

   const validateName = (form) => {
      //Validacion del nombre
      if (form.name === "") {
         setErrors({ ...errors, name: "Required field" });
      } else {
         if (form.name.includes(`'`) || form.name.includes(`"`)) {
            setErrors({
               ...errors,
               name: `It is not allowed to use any type of quotes ( " / ' )`,
            });
         } else {
            setErrors({ ...errors, name: "" });
         }
      }
   };

   const validateImage = (form) => {
      //Validacion de la URL de imagen
      if (form.image === "") {
         setErrors({ ...errors, image: "Required field" });
      } else {
         const urlRegex = /(https?:\/\/.*\.(?:png|jpg))/i;
         if (!urlRegex.test(form.image)) {
            setErrors({
               ...errors,
               image: "It must be a URL with extension (.jpg/.png/.gif/.jpeg)",
            });
         } else {
            setErrors({ ...errors, image: "" });
         }
      }
   };

   const validateSummary = (form) => {
      //Validacion de la descripcion
      if (form.summary === "") {
         setErrors({ ...errors, summary: "Required field" });
      } else {
         if (form.summary.length < 20) {
            setErrors({
               ...errors,
               summary: "Must contain at least 20 characters",
            });
         } else if (form.summary.length > 200) {
            setErrors({
               ...errors,
               summary: "maximum number of characters 200",
            });
         } else {
            setErrors({ ...errors, summary: "" });
         }
      }
   };

   const validateHealthScore = (form) => {
      //Validacion del healthScore
      if (form.healthScore === "") {
         setErrors({ ...errors, healthScore: "Required field" });
      } else if (!Number(form.healthScore)) {
         setErrors({ ...errors, healthScore: "must be a number" });
      } else {
         if (Number(form.healthScore) < 101 && Number(form.healthScore) > -1) {
            setErrors({ ...errors, healthScore: "" });
         } else {
            setErrors({
               ...errors,
               healthScore: "The healthScore is measured between 0 and 100",
            });
         }
      }
   };

   const validateSteps = (form) => {
      //validacion de las plataformas
      if (form.steps === "") {
         setErrors({
            ...errors,
            steps: "It must be available on at least two steps.",
         });
      } else {
         if (!form.steps.includes(".")) {
            setErrors({
               ...errors,
               steps: `steps must be separated by dot ( . )`,
            });
         } else {
            setErrors({ ...errors, steps: "" });
         }
      }
   };

   const validationCheeckbox = (diets) => {
      if (diets.length === 0) {
         setErrors({ ...errors, diets: "You must choose at least one diet" });
      } else {
         setErrors({ ...errors, diets: "" });
      }
   };

   useEffect(() => {
      validationCheeckbox(form.diets);
   }, [form.diets]);

   return (
      <div className={style.view_form}>

         <div className={style.form_container}>
            <div className={style.nav_button_container_home}>
               <NavLink to="/home">
                  <button className={style.button_to_home}>back to home</button>
               </NavLink>
            </div>

            <form onSubmit={handlerSubmit}>
               <h1 className={style.title_create}>Create new recipe</h1>
               <div className={style.input_container}>
                  <input
                     type="text"
                     value={form.name}
                     name="name"
                     onChange={handleChangeName}
                     placeholder="insert name"
                     autoComplete="off"
                  />
                  {errors.name && (
                     <div className={style.errores}>{errors.name}</div>
                  )}
               </div>

               <div className={style.input_container}>
                  <input
                     type="text"
                     value={form.image}
                     name="image"
                     onChange={handleChangeImage}
                     placeholder="https://www.example.com/image.png"
                     autoComplete="off"
                  />
                  {errors.image && (
                     <div className={style.errores}>{errors.image}</div>
                  )}
               </div>

               <div className={style.input_container}>
                  <input
                     type="text"
                     value={form.summary}
                     name="summary"
                     onChange={handleChangeSummary}
                     placeholder="insert summary"
                     autoComplete="off"
                  />
                  {errors.summary && (
                     <div className={style.errores}>{errors.summary}</div>
                  )}
               </div>

               <div className={style.input_container}>
                  <input
                     type="text"
                     value={form.healthScore}
                     name="healthScore"
                     onChange={handleChangeHealtScore}
                     placeholder="health score ( 0 - 100 )"
                     autoComplete="off"
                  />
                  {errors.healthScore && (
                     <div className={style.errores}>{errors.healthScore}</div>
                  )}
               </div>

               <div className={style.input_container}>
                  <input
                     type="text"
                     value={form.steps}
                     name="steps"
                     onChange={handleChangeSteps}
                     placeholder="insert steps"
                     autoComplete="off"
                  />
                  {errors.steps && (
                     <div className={style.errores}>{errors.steps}</div>
                  )}
               </div>

               <div className={style.all_checkbox_container}>
                  {diets.map((diet) => {
                     return (
                        <div className={style.container}>
                           <label className={style.checkBox}>
                              <input
                                 type="checkbox"
                                 onChange={handleChecked}
                                 value={diet.name}
                                 name="diets"
                                 className={style.ch1}
                              />
                              <div className={style.transition}></div>
                           </label>
                           {diet.name}
                        </div>
                     );
                  })}
               </div>
               {errors.diets && (
                  <div className={style.errores_check}>{errors.diets}</div>
               )}

               {(Object.values(form).some((data) => data === "") &&
                  Object.values(form).some((data) => data === [])) ||
               Object.values(errors).some((data) => data !== "") ? (
                  <button
                     className={style.submit_button_disabled}
                     type="submit">
                     submit
                  </button>
               ) : (
                  <div className={style.submit_button_container}>
                     <button className={style.submit_button} type="submit">
                        submit
                     </button>
                  </div>
               )}
            </form>
         </div>

         <div className={style.card_container}>
            <div className={style.card}>
               {form.image === "" ? (
                  <div className={style.card_inner}>
                     <img
                        className={style.image_URL}
                        src="https://cannamazoo.com/assets/defaults/img/default-product-img.jpg"
                        alt="no image"
                     />
                  </div>
               ) : (
                  <div className={style.card_inner}>
                     <img className={style.image_URL} src={form.image} alt="" />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Form;
