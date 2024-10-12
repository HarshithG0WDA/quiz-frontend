import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import CheckboxInputForm from './Components/CheckboxInputForm'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewQuestions from './Components/ViewQuestions';
import Page from './Components/Page'; // Change to capitalize Page
import Hero from './Components/Hero';
import UpdateQuestions from './Components/UpdateQuestions';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Hero />} />
          <Route path='/viewquestion' element={<ViewQuestions />} /> 
          <Route path='/addquestion' element={<CheckboxInputForm />} />
          <Route path='/about' element={<Hero />} />
          <Route path='/updatequestions' element={<UpdateQuestions />} />
          <Route path='/page' element={<Page />} /> {/* Update component reference */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;