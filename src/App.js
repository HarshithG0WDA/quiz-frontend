import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './Components/NavigationBar';
import CheckboxInputForm from './Components/CheckboxInputForm'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewQuestions from './Components/ViewQuestions';
import Home from './Components/Home';
import About from './Components/About';
import UpdateQuestions from './Components/UpdateQuestions';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar title="QUIZ APP" />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/viewquestion' element={<ViewQuestions />} /> 
        <Route path='/addquestion' element={<CheckboxInputForm />} />
        <Route path='/about' element={<About />} />
        <Route path='/updatequestions' element={<UpdateQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
