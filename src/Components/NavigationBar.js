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
        <li className = 'font-semibold'><a href="/about">Home</a></li>
        <li className='font-semibold'><a href="/viewquestion">View Questions</a></li>
        <li className='font-semibold'><a href="/addquestion">Add Questions</a></li>
        <li className='font-semibold'><a href="/updatequestions">Modify Questions</a></li>
      </ul>
      <button className='btn sign-in font-bold'>Sign In</button>
    </nav>
  );
};

export default NavigationBar;