import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "./AxiosInstance";
import './about.css';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './about.css';

const postSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  caption: Yup.string().required("Caption is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Unsupported file format (jpeg, png, avif only)",
      (v) => v && ["image/jpeg", "image/png", "image/avif"].includes(v.type)
    ),
}); //It’s created once when the module loads, not on every render.

const AddPost = () => {
  const navigate = useNavigate();
  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Create a New Post</h2>

      <Formik
        initialValues={{ title: "", caption: "", image: null }}
        validationSchema={postSchema}
        onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("caption", values.caption);
            formData.append("image", values.image);

            // await axios.post('http://127.0.0.1:8000/postBlog/', formData, {
            //   headers: { 'Content-Type': 'multipart/form-data',
            //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            //    },
            // });
            await axiosInstance.post("postBlog/", formData, {
              headers: {
                "Content-Type": "multipart/form-data", // only needed for file uploads
              },
            });

            resetForm();
            navigate("/home");
            toast.success("Post created successfully!");
          } catch (err) {
            console.error(err);
            console.error("actual error", err.response?.data);
            setErrors({ submit: "Failed to create post" });
            toast.error("Failed to create post");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.title && !!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="caption">
              <Form.Label column sm={2}>
                Caption
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="caption"
                  placeholder="Enter caption"
                  value={values.caption}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.caption && !!errors.caption}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.caption}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="image">
              <Form.Label column sm={2}>
                Image
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) =>
                    setFieldValue("image", e.currentTarget.files[0])
                  }
                  onBlur={handleBlur}
                  isInvalid={touched.image && !!errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            {errors.submit && (
              <Alert variant="danger" className="mb-3">
                {errors.submit}
              </Alert>
            )}

            <div className="text-center">
              <Button type="submit" disabled={isSubmitting} className="btn-grad">
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Submitting…
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default AddPost;
