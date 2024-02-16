import React from 'react';
import { useState } from "react";
import '../css/Button.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const URL_API = 'http://localhost:8000/api/jobs_board'

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: "nchinling@gmail.com", password: "84010910" });
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginMessage, setLoginMessage] = useState(null);


    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/login-account`, formData);
            setLoginMessage(response.data.loginMessage);
            console.log("Received back response: " + response.data.loginMessage);
            onLogin();
            if (response.data.loginMessage === 'Login successful') {
                // setIsLoggedIn(true);
                navigate('/');
            }


        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>

            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

                <label htmlFor="email">Password:</label>
                <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} /><br />

                <button type="submit" id="loginButton">Login</button>

            </form>
            <p>{loginMessage}</p>

        </div>
    );
}

export default Login;

