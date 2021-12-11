import React, { useRef, useState } from 'react';
import "../style/Input.css";
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Login = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/home");
        } catch {
            setLoading(false);
            return setError("Failed to sign in");
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
                        <Button disabled={loading} className="w-100 continue-btn" type="submit">Continue</Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 option-text">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default Login;
