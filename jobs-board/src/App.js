import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import { useState } from "react";
import './components/Navbar/Navbar';
import Home from './pages/home';
import CreateProfile from './pages/create_profile';
import Profile from './pages/profile';
import Login from './pages/login';
import Register from './pages/register';
import PostJob from './pages/postjobs';
import AllResumes from './pages/allresumes';
import AllJobs from './pages/alljobs';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const [email, setEmail] = useState('');
  const handleLogin = (email, register_type) => {
    setIsLoggedIn(true);
    setEmail(email)
    if (register_type === "employer") {
      setIsEmployer(true);
    }
    console.log("Email in App component:", email);
    console.log("Register Type in App component:", register_type);
  };

  // console.log("Email in App component:", email);
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isEmployer={isEmployer} setIsEmployer={setIsEmployer} setEmail={setEmail} />
      <Routes>
        {isLoggedIn && isEmployer && (
          <>
            <Route path='/' element={<AllJobs />} />
            <Route path='/alljobs' element={<AllJobs />} />
            <Route path='/allresumes' element={<AllResumes />} />
            <Route path='/postjob' element={<PostJob />} />
          </>
        )}
        {isLoggedIn && !isEmployer && (
          <>
            <Route path='/' element={<AllJobs />} />
            <Route path='/alljobs' element={<AllJobs />} />
            <Route path='/profile' element={<Profile email={email} />} />
            <Route path='/create_profile' element={<CreateProfile />} />

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
