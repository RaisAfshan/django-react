import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addtask from "./components/AddTasd";




function App(){
  return (<>
      <Router>
        <Routes>
          <Route path='add/'element={<Addtask/>} />
        </Routes>
      </Router>
  </>)
   
}
export default App