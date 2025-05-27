import { Container, Row, Col, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";

function Signup() {
  const { Formik } = formik;
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });
  return (
    <>
      <Container fluid className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh",  backgroundImage:
          "radial-gradient(circle 248px at center, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)",}}>
        <Row>
          <Col>
            <Card className="p-4 border-0 shadow">
              <Card.Body>
                <Card.Title className="text-center">Sign up</Card.Title>
                <Formik
                  validationSchema={schema}
                  onSubmit={console.log}
                  initialValues={{
                     username: "",
                    password: "Mark",
                    firstName: "Mark",
                    lastName: "Otto",
                    city: "",
                    state: "",
                    zip: "",
                    terms: false,
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
                      
                        <Form.Group
                          
                          md="4"
                          controlId="validationFormikUsername"
                        >
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

                        <Form.Group
                          
                          md="4"
                          controlId="validationFormik01"
                        >
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
                        <Row className="mb-3">
                        <Form.Group
                          
                          md="4"
                          controlId="validationFormik02"
                        ></Form.Group>
                        <Form.Group
                         
                          md="4"
                          controlId="validationFormik01"
                        >
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
                        <Form.Group
                          
                          md="4"
                          controlId="validationFormik02"
                        >
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
                          controlId="validationFormik03"
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
                          controlId="validationFormik04"
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
                     
                      <Button type="submit" className="">Submit form</Button>
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
