import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import axios from "axios";
import './about.css';

export default function Login() {
  const { Formik } = formik;
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  // const [isLoading, setIsLoading] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (values) => {
     try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      username: values.username,
      password: values.password,
    });
      console.log(response.data);

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/home");
      setMessage("Login successful!");
    } catch (error) {
      setMessage(
        "Login failed: " + (error.response?.data?.detail || "Unknown error")
      );
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="" style={{minWidth:"40vh", }}>
        <Card className="boder-0 shadow" style={{borderRadius:"20px"}}>
          <Card.Body className="p-5">
            <div className="text-center ">
              <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
              <p className="text-muted">Please sign in to your account</p>
              <h4 className="fw-bold text-dark"> Login </h4>
            </div>

            
                <Formik
                  validationSchema={schema}
                  onSubmit={handleLogin}
                  initialValues={{
                    username: "",
                    password: "",
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
                      <Form.Group controlId="loginUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="loginPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Button type="submit" className="mt-3 w-100 btn-grad">
                        Login
                      </Button>
                    </Form>
                  )}
                </Formik>

                {message && (
                  <div className="mt-3 text-center text-danger">{message}</div>
                )}
            
          

            {/* <div className="text-center mt-4">
              <a href="#" className="text-decoration-none" 
                 style={{ color: '#667eea' }}
                 onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                 onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                Forgot your password?
              </a>
            </div> */}

            <hr className="my-4" style={{ opacity: 0.3 }} />

            <div className="text-center">
              <span className="text-muted">Don't have an account? </span>
              <Link
                to="/signup"
                className="text-decoration-none fw-semibold"
                style={{ color: "#667eea" }}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
              >
                Sign up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
