import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import { useState } from "react";
import './components/Navbar/Navbar';
import Home from './pages/home';
import Profile from './pages/profile';
import Articles from './pages/articles';
import Login from './pages/login';
import Register from './pages/register';
import PostJob from './pages/postjobs';
import AllResumes from './pages/allresumes';
import AllJobs from './pages/alljobs';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {isLoggedIn && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/allresumes' element={<AllResumes />} />
            <Route path='/postjob' element={<PostJob />} />
          </>
        )}
        {/* <Route path='/allresumes' element={<AllResumes />} />
        <Route path='/postjob' element={<PostJob />} /> */}
        <Route path='/alljobs' element={<AllJobs />} />
        <Route path='/articles' element={<Articles />} />
        {!isLoggedIn && (
          <>
            {/* Pass handleLogin function as prop */}
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/register' element={<Register />} />
          </>
        )}
        {/* <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
