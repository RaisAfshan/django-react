import reactDom from 'react-dom/client';
import { StrictMode } from "react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = reactDom.createRoot(container);

root.render(
  <>
  <Router>
     <StrictMode>
      <App />
    </StrictMode>
  </Router>
   
  </>
  
  
);