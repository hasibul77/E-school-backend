import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('https://e-school-backend.vercel.app/api/courses');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      setError('Please login to enroll in courses');
      return;
    }

    try {
      await axios.post(`https://e-school-backend.vercel.app/api/courses/enroll/${courseId}`);
      alert('Enrolled successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">Our Courses</h1>
          <p className="lead">Explore our wide range of courses designed for your success</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {courses.map((course) => (
          <Col key={course._id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              {course.imageUrl && (
                <Card.Img 
                  variant="top" 
                  src={course.imageUrl} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{course.title}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {course.description || 'No description available'}
                </Card.Text>
                <div className="mt-auto">
                  <p className="text-muted mb-2">
                    Instructor: {course.instructor?.name || 'Unknown'}
                  </p>
                  <p className="fw-bold text-primary mb-3">
                    ${course.price || 'Free'}
                  </p>
                  <div className="d-grid gap-2">
                    <Button 
                      variant="outline-primary"
                      onClick={() => handleEnroll(course._id)}
                      disabled={!isAuthenticated || user?.role !== 'student'}
                    >
                      {!isAuthenticated 
                        ? 'Login to Enroll' 
                        : user?.role !== 'student' 
                          ? 'Students Only'
                          : 'Enroll Now'
                      }
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {courses.length === 0 && !loading && (
        <Row>
          <Col className="text-center">
            <p className="text-muted">No courses available at the moment.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Courses;