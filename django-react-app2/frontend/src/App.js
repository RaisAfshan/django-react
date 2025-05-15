import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import EditNotes from './components/EditNotes';

function App() {
  return (
    <>
    <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/editnotes/:id' element={<EditNotes/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
