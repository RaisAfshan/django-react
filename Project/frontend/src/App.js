import { Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import About from "./Components/About";
import Header from "./Components/Header";
import Login from "./Components/Login";
import AddPost from "./Components/AddPost";
import ManagePost from "./Components/ManagePost";
import EditPost from "./Components/EditPost";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";




const App =()=>{
  const location = useLocation()
  const noNavbar = location.pathname === "/" || location.pathname === "/signup"
     
  return(
    <>
     <ToastContainer position="top-right" autoClose={3000} />
    {noNavbar ?
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    :
      <Header content={
        <Routes>
        <Route path="/home" element={  <ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/about" element={<ProtectedRoute><About/></ProtectedRoute>}/>
        <Route path="/addpost" element={<ProtectedRoute><AddPost/></ProtectedRoute>}/>
        <Route path="/managepost" element={<ProtectedRoute><ManagePost/></ProtectedRoute>}/>
        <Route path="/editpost/:id" element={<ProtectedRoute><EditPost/></ProtectedRoute>}/>
      </Routes>
      
     
    }/>
    }

    
      
    </>
  )
}
export default App 
