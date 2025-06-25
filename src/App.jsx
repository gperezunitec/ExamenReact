import {BrowserRouter,Routes,Route} from "react-router-dom";
import {Empleado} from "./components/Empleado.jsx";

function App() {


  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Empleado></Empleado>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
