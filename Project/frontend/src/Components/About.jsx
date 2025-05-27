import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import './about.css'

function About() {
     const features = [
    { emoji: '💬', title: 'Real-time Messaging', desc: 'Chat instantly with friends and groups.' },
    { emoji: '🧑‍🎨', title: 'Profile Customization', desc: 'Express yourself with profile themes and bios.' },
    { emoji: '📰', title: 'Interactive News Feed', desc: 'React and comment on posts in your feed.' },
    { emoji: '🔐', title: 'Privacy & Security', desc: 'Full control over your data and visibility.' },
  ];
  return (
    <Container className="py-5">
      <Row className="mb-5 text-center">
        <Col>
          <h1>About Us</h1>
          <p className="text-muted">
            Welcome to <strong>ConnectHub</strong> — your social media platform to connect, share, and grow.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        {/* <Col md={12} className="d-flex flex-column justify-content-center"> */}
        <Col md={12} className="text-center mb-5">
          <h3>Our Mission</h3>
          <p>
            We aim to build a vibrant community where people can connect freely, share ideas, and inspire each other in a safe and respectful environment.
          </p>
        </Col>
        <Col md={12} >
          <Image
            src="https://images.unsplash.com/photo-1721864428907-647320ec2917?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our Mission"
            fluid
            rounded
          />
        </Col>
      </Row>

       <Row className="mb-5">
      <Col xs={12} className="text-center mb-4">
        <h3>Key Features</h3>
      </Col>
      {features.map((feature, index) => (
        <Col key={index} xs={12} sm={6} md={3} className="mb-4">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body>
              <div style={{ fontSize: '2rem' }}>{feature.emoji}</div>
              <Card.Title className="mt-3">{feature.title}</Card.Title>
              <Card.Text>{feature.desc}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

      <Row className="text-center mb-4">
        <Col>
          <h3>Meet the Team</h3>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1740252117027-4275d3f84385?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBpY29ufGVufDB8fDB8fHww" />
            <Card.Body>
              <Card.Title>Alice Smith</Card.Title>
              <Card.Text>Frontend Developer</Card.Text>
              <Button variant="submit" className='btn-grad'>Contact</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBpY29ufGVufDB8fDB8fHww" />
            <Card.Body>
              <Card.Title>Bob Johnson</Card.Title>
              <Card.Text>Backend Engineer</Card.Text>
              <Button variant="submit" className='btn-grad'>Contact</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBpY29ufGVufDB8fDB8fHww" />
            <Card.Body>
              <Card.Title>Clara Lee</Card.Title>
              <Card.Text>UI/UX Designer</Card.Text>
              <Button variant="submit" className='btn-grad'>Contact</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;


       
         
