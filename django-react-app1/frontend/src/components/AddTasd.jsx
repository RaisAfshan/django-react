import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";

function AddTask() {
  const [tasks, setTasks] = useState([]); 
  const [editTask, setEditTask] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null); 

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); 
  };

  const addTask = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      if (selectedFile) {
        formData.append("images", selectedFile); 
      }

      const response = await axios.post("http://127.0.0.1:8000/api/todo/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTasks([...tasks, response.data]); 
      resetForm();
      setSelectedFile(null); 
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (values, { resetForm }) => {
    try {
      let updatedData = {
        title: values.title,
        description: values.description,
      };
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("images", selectedFile);
  
        await axios.put(`http://127.0.0.1:8000/api/todo/${editTask.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`http://127.0.0.1:8000/api/todo/${editTask.id}/`, updatedData);
      }
  
      getTasks(); 
      setEditTask(null); 
      setSelectedFile(null); 
      resetForm(); 
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      setTasks(tasks.filter((task) => task.id !== id)); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Formik
            enableReinitialize
            validationSchema={schema}
            onSubmit={editTask ? updateTask : addTask}
            initialValues={{
              title: editTask ? editTask.title : "",
              description: editTask ? editTask.description : "",
              images:editTask ? editTask.images:null
              
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
                <Row className="mb-3">
                  <Form.Group as={Col} md="6">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="6">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>File Upload</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>

                <Button type="submit">
                  {editTask ? "Update Task" : "Add Task"}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>

      
      <Container className="my-4">
        <Row>
          {tasks.map((task) => (
            <Col xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center" key={task.id}>
              <Card style={{ width: "18rem" }}>
                {task.images && (
                  <Card.Img variant="top" src={task.images} alt="Task Image" />
                )}
                <Card.Body>
                  <Card.Title className="text-center">{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>

                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => setEditTask(task)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default AddTask;
