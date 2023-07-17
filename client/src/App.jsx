import { Detail, Form, Landing, Home } from "./Views";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import style from "./app.module.css"

function App() {
   const location = useLocation();

   return (
      <>
         {location.pathname !== "/" && location.pathname !== "/form" && <NavBar />}
         <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/detail/:id" element={<Detail />} />
            <Route exact path="/form" element={<Form />} />
         </Routes>
      </>
   );
}

export default App;
