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
import AllResumes from './pages/allresumes';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/allresumes' element={<AllResumes />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
