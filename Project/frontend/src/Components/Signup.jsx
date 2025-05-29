import { Container, Row, Col, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./about.css";

function Signup() {
  const { Formik } = formik;
  const [isLoading, setIsLoading] = useState(false);
  const BaseUrl = "http://127.0.0.1:8000/signUp/";
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    cpassword: yup.string().required(),
    Country: yup.string().required(),
    PhoneNumber: yup.string().required().max(10, "Invalid Phone number"),
  });

  const SaveReg = async (values) => {
    try {
      const res = await axios.post(`${BaseUrl}`, {
        username: values.username,
        password: values.password,
        password2: values.cpassword,
        first_name: values.firstName,
        last_name: values.lastName,
        country: values.Country,
        phone_number: values.PhoneNumber,
      });
      navigate("/");
      toast.success("Successfully registered");
    } catch (err) {
      console.error("error--->", err);
      console.error("Registration error:", err.response?.data);
      toast.danger(" registeration failed try again");
    }
  };

  return (
    <>
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
        }}
      >
        <Row>
          <Col>
            <Card
              className="p-4 border-0 shadow"
              style={{ borderRadius: "20px" }}
            >
              <Card.Body>
                <Card.Title className="text-center fw-bold text-dark">Sign up</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">
                  Sign Up to Get Started
                </Card.Subtitle>
                <Formik
                  validationSchema={schema}
                  onSubmit={SaveReg}
                  initialValues={{
                    username: "",
                    password: "",
                    cpassword: "",
                    firstName: "",
                    lastName: "",
                    Country: "",
                    PhoneNumber: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                  }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                      <Form.Group md="4" controlId="validationFormikUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrepend">
                            @
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group md="4" controlId="validationFormik01">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group md="4" controlId="validationFormik02">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                          type="password"
                          name="cpassword"
                          value={values.cpassword}
                          onChange={handleChange}
                          isValid={touched.cpassword && !errors.cpassword}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Row className="mb-3">
                        <Form.Group md="4" controlId="validationFormik03">
                          <Form.Label>First name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isValid={touched.firstName && !errors.firstName}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group md="4" controlId="validationFormik04">
                          <Form.Label>Last name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            isValid={touched.lastName && !errors.lastName}
                          />

                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormik05"
                        >
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Country"
                            name="Country"
                            value={values.Country}
                            onChange={handleChange}
                            isInvalid={!!errors.Country}
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.Country}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationFormik06"
                        >
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Phone number"
                            name="PhoneNumber"
                            value={values.PhoneNumber}
                            onChange={handleChange}
                            isInvalid={!!errors.PhoneNumber}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.PhoneNumber}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <div className="d-flex align-items-center">
                        <Button type="submit" className=" me-2 btn-grad">
                          Submit form
                        </Button>

                        <div className="text-center">
                          <span className="text-muted">
                            Already registered?{" "}
                          </span>
                          <Link
                            to="/"
                            className="text-decoration-none fw-semibold"
                            style={{ color: "#667eea" }}
                            onMouseEnter={(e) =>
                              (e.target.style.textDecoration = "underline")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.textDecoration = "none")
                            }
                          >
                            Please Login!
                          </Link>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default Signup;
