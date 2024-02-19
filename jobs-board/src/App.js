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
  const [email, setEmail] = useState('');
  const handleLogin = (email) => {
    setIsLoggedIn(true);
    // setEmail(email)
    console.log("Email in App component:", email);
  };

  // console.log("Email in App component:", email);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {isLoggedIn && (
          <>
            <Route path='/' element={<AllJobs />} />
            <Route path='/alljobs' element={<AllJobs />} />
            <Route path='/profile' element={<Profile />} />

            <Route path='/allresumes' element={<AllResumes />} />
            <Route path='/postjob' element={<PostJob />} />
          </>
        )}
        {!isLoggedIn && (
          <>
            <Route path='/' element={<AllJobs />} />
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/register' element={<Register />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
