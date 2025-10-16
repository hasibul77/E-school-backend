import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, Alert, Spinner, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchEnrolledCourses();
  }, [isAuthenticated, navigate]);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get('https://e-school-backend.vercel.app/api/courses/user/enrolled');
      setEnrolledCourses(response.data.enrolledCourses || []);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      if (error.response?.status === 404) {
        setError('User not found. Please try logging in again.');
      } else {
        setError('Failed to load enrolled courses. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewCourse = (courseId) => {
    navigate(`/courses`);
  };

  const handleContinueLearning = (courseId) => {
    // Navigate to course learning page or first lesson
    navigate(`/courses`);
  };

  if (!isAuthenticated) {
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
      <Row>
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                   style={{width: '80px', height: '80px'}}>
                <span className="text-white fs-4 fw-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <Card.Title className="h5">{user?.name}</Card.Title>
              <Card.Text>
                <span className={`badge ${
                  user?.role === 'admin' ? 'bg-danger' : 
                  user?.role === 'instructor' ? 'bg-warning' : 'bg-primary'
                } p-2`}>
                  {user?.role?.toUpperCase()}
                </span>
              </Card.Text>
              <Card.Text className="text-muted small">
                {user?.email}
              </Card.Text>
              <Card.Text className="small text-muted">
                Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Stats Card */}
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <h6 className="text-center mb-3">Learning Stats</h6>
              <div className="text-center">
                <div className="h4 text-primary mb-1">{enrolledCourses.length}</div>
                <div className="small text-muted">Courses Enrolled</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {/* Enrolled Courses Section */}
          <Card className="shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">My Learning Journey</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Enrolled Courses ({enrolledCourses.length})</h6>
                {enrolledCourses.length > 0 && (
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => navigate('/courses')}
                  >
                    Browse More Courses
                  </Button>
                )}
              </div>
              
              {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading courses...</span>
                  </Spinner>
                  <div className="mt-2 small text-muted">Loading your courses...</div>
                </div>
              ) : enrolledCourses.length > 0 ? (
                <ListGroup variant="flush">
                  {enrolledCourses.map((course) => (
                    <ListGroup.Item key={course._id} className="px-0">
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center mb-2">
                            <h6 className="mb-0 me-2">{course.title}</h6>
                            <span className={`badge ${
                              course.price > 0 ? 'bg-success' : 'bg-secondary'
                            } rounded-pill`}>
                              {course.price > 0 ? `$${course.price}` : 'Free'}
                            </span>
                          </div>
                          <p className="small text-muted mb-2">
                            {course.description && course.description.length > 120 
                              ? `${course.description.substring(0, 120)}...`
                              : course.description || 'No description available'
                            }
                          </p>
                          <div className="d-flex align-items-center small text-muted">
                            <span className="me-3">
                              Instructor: {course.instructor?.name || 'Unknown'}
                            </span>
                            <span>
                              {course.lessons?.length || 0} lessons
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-2 ms-3">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleContinueLearning(course._id)}
                          >
                            Continue
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            onClick={() => handleViewCourse(course._id)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Alert variant="info" className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-book" style={{fontSize: '3rem', color: '#7d4e97'}}></i>
                  </div>
                  <h6>No Courses Enrolled Yet</h6>
                  <p className="mb-3">Start your learning journey by enrolling in courses that interest you.</p>
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/courses')}
                  >
                    Browse Available Courses
                  </Button>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {/* Instructor/Admin Tools */}
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <Card className="shadow-sm mt-4">
              <Card.Header className="bg-light">
                <h5 className="mb-0">Instructor Tools</h5>
              </Card.Header>
              <Card.Body>
                <p className="text-muted mb-3">
                  As an {user.role}, you can create and manage educational content for students.
                </p>
                <div className="d-grid gap-2 d-md-flex">
                  <Button 
                    variant="primary" 
                    className="me-md-2"
                    onClick={() => navigate('/courses')}
                  >
                    Manage Courses
                  </Button>
                  <Button 
                    variant="outline-primary"
                    onClick={() => navigate('/books')}
                  >
                    Manage Books
                  </Button>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;