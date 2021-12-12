import React from 'react';
import "../style/Title.css";
import { Card } from 'react-bootstrap';

const Title = () => {

    return (
        <Card className="border-0">
            <Card.Body className="text-center card-background">
                <Card.Text className="title-font" style={{color: "#fff1c1"}}>TeamPro</Card.Text>
                <div className="d-grid gap-2">
                    <a href="/signup" className="title-btn signup-btn"><span>Sign Up</span></a>
                    <a href="/login" className="title-btn login-btn"><span>Log In</span></a>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Title;
