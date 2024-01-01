import React from 'react';
import { useState } from "react";
import '../css/Login.css';
import axios from 'axios';

const URL_API = 'http://localhost:8000/api/jobs_board'

function Login({ }) {
    const [formData, setFormData] = useState({ name: "Chin Ling", occupation: "Software engineer", email: "nchinling@gmail.com" });

    const [registerMessage, setRegisterMessage] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/create-user-account`, formData);
            setRegisterMessage(response.data.registerMessage);

            console.log("Received back response: " + response.data.registerMessage);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container" style={{ height: '750px' }}>

            <form onSubmit={handleSubmit}>

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />

                <label htmlFor="occupation">Occupation:</label>
                <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} /><br />

                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

                <button type="submit" id="loginButton">Login</button>
                <button type="submit" id="registerButton">Register</button>

            </form>
            <p>{registerMessage}</p>

        </div>
    );
}

export default Login;

