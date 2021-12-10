import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap';
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
        <>
            <Card>
                <Card.Body>
                    <h2>Something</h2>
                </Card.Body>
            </Card>
            <div>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Button variant='link' onClick={handleLogout}>Sign Out</Button>
            </div>
        </>
    )
}

export default Home;
