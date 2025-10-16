import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5 className="fw-bold">E-School</h5>
            <p>Quality education for everyone, everywhere. Enhance your skills with our online courses and books.</p>
          </Col>
          <Col md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/courses" className="text-light text-decoration-none">Courses</Link></li>
              <li><Link to="/books" className="text-light text-decoration-none">Books</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">About Us</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contact Info</h6>
            <p className="mb-1">Email: hasibul.himel846@gmail.com</p>
            <p className="mb-1">Phone: +880 1744330557</p>
            <p>Address: Mirpur, Dhaka-1216</p>
          </Col>
        </Row>
        <hr className="my-3" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; 2025 E-School. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;