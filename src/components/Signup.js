import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Signup = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            setLoading(true);
            await signup(nameRef.current.value, emailRef.current.value, passwordRef.current.value);
            navigate("/home");
        } catch {
            return setError("Failed to create an account");
        }
        setLoading(false);
    }

    return (
        <>
            <Card className="border-0">
                <Card.Body className="card-background">
                    <Card.Text className="text-center title-font" style={{color: "#fff1c1"}}>TeamPro</Card.Text>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Name"
                            className="mb-3 custom-label"
                        >
                            <Form.Control type="name" placeholder="Name" ref={nameRef} required />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3 custom-label"
                        >
                            <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId="floatingPassword" 
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} required/>
                        </FloatingLabel>
                        <FloatingLabel 
                            controlId="floatingPassword" 
                            label="Password"
                            className="mb-3"
                        >
                            <Form.Control type="password" placeholder="Password" ref={passwordConfirmRef} required/>
                        </FloatingLabel>
                        <Button disabled={loading} className="w-100 continue-btn" type="submit">Continue</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 option-text">
                Already have an account? <Link to="/login">Log In</Link>
            </div>
        </>
    )
}

export default Signup;
