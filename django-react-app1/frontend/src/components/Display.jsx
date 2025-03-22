import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Display() {
  return (
    <>
      <Container>
        <Row className='text-end'>
            <Col>
                <Button variant="primary">Add Task</Button>
            </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title className="teaxt-center">Tasks</Card.Title>            
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Display
