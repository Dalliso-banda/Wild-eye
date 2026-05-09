import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function NavBar() {
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
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/map">Map</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </>
    )
}