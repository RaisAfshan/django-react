
import * as formik from 'formik';
import { useEffect, useState } from 'react';
import { Container, Form,Row, Spinner,Col,Button, } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup';
function EditNotes(){
   const { Formik } = formik;
   const{id} = useParams()
   console.log(id)
    const navigate = useNavigate();
    const [initialValues,setinitialValues] = useState({ title: '', description: '' })
    const [loading,setLoading] = useState(true)

  const schema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
   
  });

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/notes/${id}/`)
    .then(res=>{
      setinitialValues({
        title: res.data.title,
        description: res.data.description
      })
      setLoading(false);
    })
    .catch(err=>{
       console.error('Error loading note:', err);
      setLoading(false);
    })
  },[id])

  if(loading){
    return(
      <Container>
        <Spinner animation='border' />
          <p>Loading...</p>
        
      </Container>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}   
      enableReinitialize // is a Formik prop that tells Formik to update the form values when initialValues change.
      onSubmit={async (values,{ setSubmitting })=>{
         await axios.put(`http://localhost:8000/api/notes/${id}/`, values)
          setSubmitting(false);
          navigate('/');
      }}
     
    >
      {({ handleSubmit, handleChange, values, touched, errors,isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationFormik01">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                isValid={touched.title && !errors.title}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={values.description}
                onChange={handleChange}
                isValid={touched.description && !errors.description}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
         </Row>
          <Button type="submit"  variant="success" disabled={isSubmitting}>{isSubmitting?'updating..':'update'}</Button>
          <Button variant="secondary" onClick={()=>navigate('/')}>Cancel</Button>
        </Form>
      )}
    </Formik>
  );
}

export default EditNotes