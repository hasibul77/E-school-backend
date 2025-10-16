import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import aboutImg from "../assets/E-lern.jpg";

const About = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1 className="fw-bold text-center mb-4">About E-School</h1>
          <p className="lead text-center">
            Transforming education through innovative online learning solutions
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={6} className="mb-4">
          <h3 className="fw-bold mb-4">Our Mission</h3>
          <p>
            At E-School, we believe that education should be accessible, engaging, 
            and effective for everyone. Our mission is to break down barriers to 
            quality education by providing a comprehensive online learning platform 
            that connects students with expert instructors and valuable resources.
          </p>
          <p>
            We're committed to creating a learning environment that fosters 
            curiosity, encourages collaboration, and empowers individuals to 
            achieve their educational and career goals.
          </p>
          
          {/* Quick Navigation Buttons */}
          <div className="d-flex gap-3 mt-4">
            <Button 
              variant="primary" 
              onClick={() => navigate('/courses')}
              className="fw-semibold"
            >
              Explore Courses
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={() => navigate('/books')}
              className="fw-semibold"
            >
              Browse Books
            </Button>
          </div>
        </Col>
        <Col lg={6}>
          <img 
            src={aboutImg}
            alt="Our Mission" 
            className="img-fluid about-img"
          />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h3 className="fw-bold text-center mb-4">What We Offer</h3>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card 
            className="h-100 border-0 shadow-sm clickable-card"
            onClick={() => navigate('/courses')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className="text-center">
              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
                <i className="text-white fs-4">👨‍🏫</i>
              </div>
              <Card.Title>Expert Instructors</Card.Title>
              <Card.Text>
                Learn from industry professionals and experienced educators 
                who are passionate about sharing their knowledge.
              </Card.Text>
              <Button variant="outline-primary" size="sm">
                View Courses
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card 
            className="h-100 border-0 shadow-sm clickable-card"
            onClick={() => navigate('/courses')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className="text-center">
              <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
                <i className="text-white fs-4">📱</i>
              </div>
              <Card.Title>Flexible Learning</Card.Title>
              <Card.Text>
                Access courses and materials anytime, anywhere. Learn at your 
                own pace with our mobile-friendly platform.
              </Card.Text>
              <Button variant="outline-success" size="sm">
                Start Learning
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card 
            className="h-100 border-0 shadow-sm clickable-card"
            onClick={() => navigate('/books')}
            style={{ cursor: 'pointer' }}
          >
            <Card.Body className="text-center">
              <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '70px', height: '70px'}}>
                <i className="text-white fs-4">📚</i>
              </div>
              <Card.Title>Digital Books</Card.Title>
              <Card.Text>
                Access a vast library of digital books and educational resources 
                to supplement your learning journey.
              </Card.Text>
              <Button variant="outline-warning" size="sm">
                Explore Books
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Features Section with Clear Navigation */}
      <Row className="mt-5 mb-5">
        <Col>
          <h3 className="fw-bold text-center mb-4">Explore Our Resources</h3>
          <Row className="mt-4">
            <Col md={6} className="mb-4">
              <Card 
                className="border-0 shadow-sm h-100 clickable-card"
                onClick={() => navigate('/courses')}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="text-center p-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="text-white fs-3">🎓</i>
                  </div>
                  <Card.Title className="h4">Expert Courses & Flexible Learning</Card.Title>
                  <Card.Text className="mb-4">
                    Discover our comprehensive course catalog with expert instructors 
                    and flexible learning options that fit your schedule.
                  </Card.Text>
                  <Button variant="primary" size="lg">
                    Browse All Courses
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card 
                className="border-0 shadow-sm h-100 clickable-card"
                onClick={() => navigate('/books')}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="text-center p-4">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="text-white fs-3">📖</i>
                  </div>
                  <Card.Title className="h4">Digital Books</Card.Title>
                  <Card.Text className="mb-4">
                    Explore our extensive digital library with books covering various 
                    subjects and skill levels to enhance your learning experience.
                  </Card.Text>
                  <Button variant="warning" size="lg">
                    View Book Collection
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Row className="mt-5 bg-light py-5 rounded">
        <Col className="text-center">
          <h4 className="fw-bold mb-3">Ready to Start Your Learning Journey?</h4>
          <p className="text-muted mb-4">
            Choose from our wide range of courses and books to begin your educational adventure today.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/courses')}
              className="px-4"
            >
              Explore Courses
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={() => navigate('/books')}
              className="px-4"
            >
              Browse Books
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;