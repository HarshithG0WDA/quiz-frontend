import React from 'react';
import './Navbar.css'; 
import logo from '../assets/logo.webp'; 

const NavigationBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <img src={logo} alt="QuizApp Logo" className='logo' /> 
        
      </div>
      <ul className='nav-links'>
        <li><a href="/viewquestion">View Questions</a></li>
        <li><a href="/addquestion">Add Questions</a></li>
        <li><a href="/updatequestions">Modify Questions</a></li>
        <li><a href="/about">About</a></li>
      </ul>
      <button className='btn sign-in'>Sign In</button>
    </nav>
  );
};

export default NavigationBar;