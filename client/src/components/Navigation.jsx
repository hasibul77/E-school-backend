import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from "../assets/logo.png";

const Navigation = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar  expand="lg" sticky="top" className="shadow-sm" style={{ backgroundColor: "#F8FFFB"}}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary fs-3">
           <img src={logo} alt="Logo" className="img-fluid logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-semibold">Home</Nav.Link>
            <Nav.Link as={Link} to="/courses" className="fw-semibold">Courses</Nav.Link>
            <Nav.Link as={Link} to="/books" className="fw-semibold">Books</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-semibold">About</Nav.Link>
          </Nav>

          <Nav>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile" className="fw-semibold">
                  <i className="user-icon">👨‍💻</i> {user?.name}
                </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;