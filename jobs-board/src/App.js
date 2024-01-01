import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import './components/Navbar/Navbar';
import Home from './pages/home';
import Profile from './pages/profile';
import Articles from './pages/articles';
import Login from './pages/login';
import Contact from './pages/contact';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
