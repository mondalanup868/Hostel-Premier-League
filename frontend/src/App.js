// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SoloReg from './components/SoloReg';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/home/soloFF" element={<SoloReg/>} />
      </Routes>
    </Router>
  );
}

export default App;
