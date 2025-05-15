import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AddNoteForm = ({ onSuccess, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    onSubmit: async (values, { resetForm }) => {
      await axios.post("http://localhost:8000/api/notes/", values);
      resetForm();
      onSuccess(); 
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="my-3">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="Enter title"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          placeholder="Enter description"
          rows={3}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit" className="me-2">Save</Button>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    </Form>
  );
};

export default AddNoteForm;
