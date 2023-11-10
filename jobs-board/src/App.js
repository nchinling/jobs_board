import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';
import './components/Navbar/Navbar';
import Home from './pages/home';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import Contact from './pages/contact';

// import DividendYieldForm from './components/DividendYieldForm';
// import Models from './components/Models';
// import Title from './components/Title';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
