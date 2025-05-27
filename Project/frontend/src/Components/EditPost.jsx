import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Container,Row,Col,Form,Button,Spinner,Alert,Image,} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

// Validation schema
const postSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  caption: Yup.string().required("Caption is required"),
  image: Yup.mixed().nullable().test(
    "fileType",
    "Unsupported file format (jpeg, png, avif only)",
    (value) =>
      !value ||
      (value && ["image/jpeg", "image/png", "image/avif"].includes(value.type))
  ),
});

const EditPost = () => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    caption: "",
    image: null,
  });
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/postBlog/${id}/`);
        setInitialValues({
          title: res.data.title,
          caption: res.data.caption,
          image: null,
        });
        setExistingImage(res.data.image); // store current image URL
      } catch (err) {
        setSubmitError("Failed to load post data");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("caption", values.caption);
      if (values.image) {
        formData.append("image", values.image);
      }

      await axios.put(`http://127.0.0.1:8000/postBlog/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/managepost");
    } catch (err) {
      setSubmitError("Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Edit Post</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={postSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, isSubmitting, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Field
                  name="title"
                  as={Form.Control}
                  placeholder="Enter title"
                  isInvalid={!!errors.title}
                />
                <ErrorMessage
                  name="title"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Col>
            </Form.Group>

            {/* Caption */}
            <Form.Group as={Row} className="mb-3" controlId="caption">
              <Form.Label column sm={2}>
                Caption
              </Form.Label>
              <Col sm={10}>
                <Field
                  name="caption"
                  as={Form.Control}
                  rows={3}
                  placeholder="Enter caption"
                  isInvalid={!!errors.caption}
                />
                <ErrorMessage
                  name="caption"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Col>
            </Form.Group>

            {/* Existing Image */}
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Current Image
              </Form.Label>
              <Col sm={10}>
                <Image
                  src={existingImage}
                  fluid
                  rounded
                  alt="Current"
                  style={{ maxHeight: "200px" }}
                />
              </Col>
            </Form.Group>

            {/* Upload New Image */}
            <Form.Group as={Row} className="mb-3" controlId="image">
              <Form.Label column sm={2}>
                New Image
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFieldValue("image", e.currentTarget.files[0])
                  }
                  isInvalid={!!errors.image}
                />
                <ErrorMessage
                  name="image"
                  component={Form.Control.Feedback}
                  type="invalid"
                />
              </Col>
            </Form.Group>

            {/* Submit Error */}
            {submitError && (
              <Alert variant="danger" className="mb-3">
                {submitError}
              </Alert>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Post"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditPost;
