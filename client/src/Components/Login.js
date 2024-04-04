import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { Link, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });
            console.log(response.data.message);
            // Redirect to todo page upon successful login
            setLoggedIn(true);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            setErrorMessage(errorMessage);
        }
    };

    // Redirect to Todo page if logged in
    if (loggedIn) {
        return <Navigate to="/todo" />;
    }

    return (
        <>
            <div className="login-page">
                <h1 style={{textAlign:"center"}}>Login</h1>
                <div className="form">
                    <form className='login-form' onSubmit={handleLogin}>
                        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="submit">Login</button>
                        <p className='message'>Not Registered? <Link to="/register">Create an account</Link></p>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
