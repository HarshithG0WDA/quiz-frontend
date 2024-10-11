import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap'; 
import '../App.css'; 

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
      <Navbar.Brand href="/">QuizApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto"> 

          <Nav.Link href="/viewquestion">View Question</Nav.Link>
          <Nav.Link href="/addquestion">Add Question</Nav.Link>
          <Nav.Link href="/updatequestions">Update Questions</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Button className="sign-in" variant="primary">Sign In</Button> 
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
