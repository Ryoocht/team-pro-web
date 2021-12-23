import React from 'react';
import "../style/Title.css";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Title = () => {

    return (
        <Card className="border-0">
            <Card.Body className="text-center card-background">
                <Card.Text className="title-font" style={{color: "#fff1c1"}}>TeamPro</Card.Text>
                <div className="d-grid gap-2">
                    <Link to="/team-pro-web/signup" className="title-btn signup-btn"><span>Sign Up</span></Link>
                    <Link to="/login" className="title-btn login-btn"><span>Log In</span></Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Title;
