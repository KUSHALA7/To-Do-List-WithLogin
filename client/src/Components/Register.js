import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./login.css";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                email,
                password,
                confirmPassword,
            });
            console.log(response.data.message);
            window.location.href = '/login';
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'An error occurred';
            setErrorMessage(errorMessage);
        }
    };

    return (
        <>
            <div className="login-page">
                <h1 style={{ textAlign: "center" }}>Register</h1>
                <div className="form">
                    <form className='login-form' onSubmit={handleRegister}>
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <button type="submit">Register</button>
                        <p className='message'>Already registered? <Link to="/login">Login</Link></p>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
