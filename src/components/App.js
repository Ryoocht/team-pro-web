import React from 'react';
import "../style/App.css";
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Title from './Title';
import Signup from './Signup';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center vw-100 vh-100" style={{background: "#004445"}}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Title />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/forgot-password" element={<ForgotPassword />} />
              {/* <Route 
                exact path="/home" 
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                } /> */}
                <Route exact path="/home" element={<Home />}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
