import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Carousel, Spinner, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HeroImage from "../assets/Frame.png";
import axios from 'axios';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://e-school-backend.vercel.app/api/courses');
      setCourses(response.data.slice(0, 6)); // Show only first 6 courses
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`https://e-school-backend.vercel.app/api/courses/enroll/${courseId}`);
      alert('Enrolled successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Learn Without Limits
              </h1>
              <p className="lead mb-4">
                Start, switch, or advance your career with thousands of courses, 
                professional certificates, and degrees from world-class universities 
                and companies.
              </p>
              {!isAuthenticated ? (
                <Button 
                  variant="light" 
                  size="lg" 
                  className="me-3"
                  onClick={() => navigate('/signup')}
                >
                  Join for Free
                </Button>
              ) : (
                <Button 
                  variant="light" 
                  size="lg" 
                  className="me-3"
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              )}
              <Button 
                variant="outline-light" 
                size="lg"
                onClick={() => navigate('/about')}
              >
                Learn More
              </Button>
            </Col>
            <Col lg={6}>
              <img 
                 src={HeroImage}
                 alt="hero" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Courses Carousel Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Featured Courses</h2>
              <p className="lead">Discover our most popular courses handpicked for you</p>
            </Col>
          </Row>

          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          {loading ? (
            <Row className="justify-content-center">
              <Col className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading courses...</span>
                </Spinner>
              </Col>
            </Row>
          ) : courses.length > 0 ? (
            <>
              {/* Desktop Carousel */}
              <div className="d-none d-lg-block">
                <Carousel indicators={false} interval={5000}>
                  {[...Array(Math.ceil(courses.length / 3))].map((_, slideIndex) => (
                    <Carousel.Item key={slideIndex}>
                      <Row>
                        {courses.slice(slideIndex * 3, slideIndex * 3 + 3).map((course) => (
                          <Col lg={4} key={course._id} className="mb-4">
                            <Card className="h-100 shadow-sm course-card">
                              {course.imageUrl && (
                                <Card.Img 
                                  variant="top" 
                                  src={course.imageUrl} 
                                  style={{ height: '200px', objectFit: 'cover' }}
                                />
                              )}
                              <Card.Body className="d-flex flex-column">
                                <Card.Title className="h6">{course.title}</Card.Title>
                                <Card.Text className="flex-grow-1 small text-muted">
                                  {course.description ? 
                                    (course.description.length > 100 
                                      ? `${course.description.substring(0, 100)}...` 
                                      : course.description)
                                    : 'No description available'
                                  }
                                </Card.Text>
                                <div className="mt-auto">
                                  <p className="text-muted mb-1 small">
                                    Instructor: {course.instructor?.name || 'Unknown'}
                                  </p>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold text-primary">
                                      ${course.price || 'Free'}
                                    </span>
                                    <div className="d-flex gap-2">
                                      <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => navigate(`/courses`)}
                                      >
                                        View
                                      </Button>
                                      <Button 
                                        variant="primary" 
                                        size="sm"
                                        onClick={() => handleEnroll(course._id)}
                                        disabled={!isAuthenticated}
                                      >
                                        {!isAuthenticated ? 'Login' : 'Enroll'}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              {/* Mobile Carousel */}
              <div className="d-lg-none">
                <Carousel indicators={false} interval={5000}>
                  {courses.map((course) => (
                    <Carousel.Item key={course._id}>
                      <Row className="justify-content-center">
                        <Col sm={8}>
                          <Card className="h-100 shadow-sm course-card">
                            {course.imageUrl && (
                              <Card.Img 
                                variant="top" 
                                src={course.imageUrl} 
                                style={{ height: '200px', objectFit: 'cover' }}
                              />
                            )}
                            <Card.Body className="d-flex flex-column">
                              <Card.Title>{course.title}</Card.Title>
                              <Card.Text className="flex-grow-1 text-muted">
                                {course.description || 'No description available'}
                              </Card.Text>
                              <div className="mt-auto">
                                <p className="text-muted mb-2">
                                  Instructor: {course.instructor?.name || 'Unknown'}
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="fw-bold text-primary">
                                    ${course.price || 'Free'}
                                  </span>
                                  <div className="d-flex gap-2">
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm"
                                      onClick={() => navigate(`/courses`)}
                                    >
                                      View
                                    </Button>
                                    <Button 
                                      variant="primary" 
                                      size="sm"
                                      onClick={() => handleEnroll(course._id)}
                                      disabled={!isAuthenticated}
                                    >
                                      {!isAuthenticated ? 'Login' : 'Enroll'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>

              {/* View All Courses Button */}
              <Row className="mt-4">
                <Col className="text-center">
                  <Button 
                    variant="outline-primary" 
                    size="lg"
                    onClick={() => navigate('/courses')}
                  >
                    View All Courses
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <Row>
              <Col className="text-center">
                <p className="text-muted">No courses available at the moment.</p>
                <Button 
                  variant="primary"
                  onClick={() => navigate('/courses')}
                >
                  Check Back Later
                </Button>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Quick Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Start Learning Today</h2>
              <p className="lead">Choose your learning path</p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={5} className="mb-4">
              <Card 
                className="border-primary clickable-card h-100"
                onClick={() => navigate('/courses')}
                style={{ cursor: 'pointer', border: '2px solid' }}
              >
                <Card.Body className="text-center py-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="text-white fs-3">🎓</i>
                  </div>
                  <Card.Title className="h4">Expert Courses</Card.Title>
                  <Card.Text className="mb-3">
                    Learn from industry experts with comprehensive courses designed for your success. 
                    Flexible learning options to fit your schedule.
                  </Card.Text>
                  <Button variant="primary" size="lg">
                    Explore Courses
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5} className="mb-4">
              <Card 
                className="border-warning clickable-card h-100"
                onClick={() => navigate('/books')}
                style={{ cursor: 'pointer', border: '2px solid' }}
              >
                <Card.Body className="text-center py-4">
                  <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                    <i className="text-white fs-3">📖</i>
                  </div>
                  <Card.Title className="h4">Digital Books</Card.Title>
                  <Card.Text className="mb-3">
                    Access our extensive library of digital books and learning resources. 
                    Perfect for supplementing your courses or independent study.
                  </Card.Text>
                  <Button variant="warning" size="lg">
                    Browse Books
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="fw-bold mb-3">Ready to Start Learning?</h3>
              <p className="mb-4">Join thousands of students already learning with E-School</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate(isAuthenticated ? '/courses' : '/signup')}
                >
                  {isAuthenticated ? 'Explore Courses' : 'Get Started Today'}
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg"
                  onClick={() => navigate('/books')}
                >
                  Browse Books
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;