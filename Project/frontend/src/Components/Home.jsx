import { useState, useEffect } from "react";
import axios from "axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Container, Row, Col, Card, Badge, Alert, Spinner } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/postBlog/`);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Container className="py-5" style={{  }}>
      <Row className="justify-content-center">
        <Col lg={8} md={10}>
         
          {error && <Alert variant="danger">{error}</Alert>}

         
          {data.length === 0 && !error ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" /> Loading...
            </div>
          ) : (
            data.map((post) => (
              <Card key={post.id} className="shadow-lg border-0 rounded-3 overflow-hidden mb-4" style={{backgroundImage:'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'}}>
              
                <div className="position-relative">
                  <Card.Img
                    src={post.image}
                    alt={post.title}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <Badge bg="dark" className="bg-opacity-75 text-white px-3 py-2 rounded-pill">
                      <i className="bi bi-calendar me-1"></i>
                       {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Badge>
                  </div>
                </div>

              
                <Card.Body className="p-4">
                     <div className="mb-2">
                        <FavoriteIcon className="me-2"/>
                        <ChatBubbleIcon className="me-2"/>
                        <SendIcon/>

                  </div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Card.Title className="h3 mb-0 text-primary fw-bold">{post.title}</Card.Title>
                  </div>
                 
                  <Card.Text className="text-muted fs-5 lh-base mb-0">{post.caption}</Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Home;
