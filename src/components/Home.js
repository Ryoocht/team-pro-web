import React, { useState } from 'react';
import "../style/Home.css";
import { Alert, Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
    const [ error, setError ] = useState("");
    const { signout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        setError("");
        try {
            await signout();
            navigate("/");
        } catch {
            setError("Failed to sign out");
        }
    }
    
    return (
        <div className="home-container">
            <div className="float-left">
                <div className="title-container">
                    <Card.Text className="text-center title-font" style={{color: "#fff1c1"}}>TeamPro</Card.Text>
                </div>
                <div className="logout-container">
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Button variant="outline-secondary" className="signout-btn" onClick={handleLogout}>Sign Out</Button>
                </div>
            </div>
            <div className="float-right ">
                <Container className="d-flex align-items-center justify-content-center" >
                <Card className="chat-card">
                    <Card.Body>
                    <h1>somthing</h1>
                    </Card.Body>
                </Card>
                </Container>
            </div>
            
        </div>
    );
}

export default Home;
