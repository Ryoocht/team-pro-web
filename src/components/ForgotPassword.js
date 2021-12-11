import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, FloatingLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {

    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState("");
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            setMessage();
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions");
        } catch {
            setLoading(false);
            return setError("Failed to reset password");
        }
        setLoading(false);
    }

    return (
        <>
            <Card className="border-0">
                <Card.Body className="card-background">
                    <Card.Text className="text-center title-font" style={{color: "#fff1c1"}}>TeamPro</Card.Text>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-3 custom-label"
                        >
                            <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
                        </FloatingLabel>
                        <Button disabled={loading} className="w-100 continue-btn" type="submit">Reset Password</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2 option-text">
            Already have an account? <Link to="/login">Log In</Link>
            </div>
            <div className="w-100 text-center mt-2 option-text">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}

export default ForgotPassword;
