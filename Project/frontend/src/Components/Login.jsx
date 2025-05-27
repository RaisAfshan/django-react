import React, { useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      <div className="">
        <Card
          className="shadow-lg border-0"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            width: "400px",
            maxWidth: "90vw",
          }}
        >
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
              <p className="text-muted">Please sign in to your account</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="username">
                <Form.Label className="fw-semibold text-dark">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #e9ecef",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow = "0 0 0 0.2rem  #16d9e3 0%";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="password">
                <Form.Label className="fw-semibold text-dark">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #e9ecef",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#667eea";
                    e.target.style.boxShadow = "0 0 0 0.2rem  #16d9e3 0%";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e9ecef";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </Form.Group>

              {/* <Form.Group className="mb-4" controlId="rememberMe">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="text-muted"
                />
              </Form.Group> */}

              <Button
                type="submit"
                size="lg"
                className="w-100 text-white fw-semibold"
                disabled={isLoading}
                style={{
                  background:
                    "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",
                  borderRadius: "12px",
                  border: "none",
                  padding: "12px",
                  transition: "all 0.3s ease",
                  transform: isLoading ? "scale(0.98)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "scale(1.02)";
                    e.target.style.boxShadow = "0 8px 25px  #16d9e3 0%";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form>

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
