import CustomNavBar from "./components/CustomNavBar"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Personas from "./pages/Personas";
import Cursos from "./pages/Cursos";
import Categorias from "./pages/Categorias";

function App() {

  return (
    <div className="bg-background">
      <Routes>
      <Route element={<CustomNavBar/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/personas" element={<Personas/>}/>
        <Route path="/cursos" element={<Cursos/>}/>
        <Route path="/categorias" element={<Categorias/>}/>
      </Route>
      </Routes>
    </div>
  )
}

export default App
