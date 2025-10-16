import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://e-school-backend.vercel.app/api/books');
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
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
          <h1 className="fw-bold">Digital Library</h1>
          <p className="lead">Explore our collection of educational books and resources</p>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {books.map((book) => (
          <Col key={book._id} md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              {book.coverImage && (
                <Card.Img 
                  variant="top" 
                  src={book.coverImage} 
                  style={{ height: '300px', objectFit: 'cover' }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  by {book.author}
                </Card.Subtitle>
                <Card.Text className="flex-grow-1">
                  {book.description || 'No description available'}
                </Card.Text>
                <div className="mt-auto">
                  <p className="fw-bold text-primary mb-3">
                    ${book.price || 'Free'}
                  </p>
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary"
                      disabled={!book.fileUrl}
                    >
                      {book.fileUrl ? 'Download' : 'Not Available'}
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {books.length === 0 && !loading && (
        <Row>
          <Col className="text-center">
            <p className="text-muted">No books available at the moment.</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Books;