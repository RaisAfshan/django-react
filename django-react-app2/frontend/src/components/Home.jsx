import { Button, Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import AddNoteForm from "./AddNoteForm";
import { Link } from "react-router-dom";

function Home() {
  const api = "http://localhost:8000/api/notes/";
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false); // toggle form

  const fetchNotes = async () => {
    const res = await axios.get(api);
    setNotes(res.data);
  };

  const DeleteNotes = async (id) => {
    const confirm = window.confirm("are you sure you wnt to delete");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:8000/api/notes/${id}/`);
      fetchNotes();
    } catch (err) {
      console.error("Failed to delete note:", err);
      alert("Error deleting note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container className="my-5">
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Add
      </Button>

      {showForm && (
        <Row>
          <AddNoteForm
            onSuccess={() => {
              fetchNotes();
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </Row>
      )}

      <Row className="mt-4" xs={1} sm={2} md={3} lg={4}>
        {notes.map((n) => (
          <Col key={n.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{n.title}</Card.Title>
                <Card.Text>
                  {n.description} {n.id}
                </Card.Text>
                <Link to={`/editnotes/${n.id}`}>
                  <Button variant="info">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => DeleteNotes(n.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
