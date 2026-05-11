import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserAuth';


export default function NavBar() {
  const {user}= useAuth();
  console.log(user,'user')
    return (
        <>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
      
          <Navbar.Brand as={Link} to="/">🛡️Wild-<span className='text-warning'>Eye</span></Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
               
              <Nav.Link as={Link} to="/map">Map</Nav.Link>
              {user ? (
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              ) : (
                <div>
                   <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </div>)
                 }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    )
}