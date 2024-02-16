import React from 'react';
import { useState } from "react";
import '../css/Button.css';
import axios from 'axios';

const URL_API = 'http://localhost:8000/api/jobs_board'

function Register({ }) {
    const [formData, setFormData] = useState({ name: "Chin", email: "nchinling@gmail.com", password: "84010910", registerType: "employee", company: "" });

    const [registerMessage, setRegisterMessage] = useState(null);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    // };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
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


                <label htmlFor="email">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} /><br />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} /><br />

                <label htmlFor="email">Password:</label>
                <input type="text" id="password" name="password" value={formData.password} onChange={handleChange} /><br />

                <label>Register as:</label>
                <label htmlFor="employee">
                    Employee<input type="radio" id="employee" name="registerType" value="employee" onChange={handleChange} />
                </label>
                <label htmlFor="employer">
                    Employer <input type="radio" id="employer" name="registerType" value="employer" onChange={handleChange} />
                </label>

                {formData.registerType === "employer" && (
                    <div>
                        <label htmlFor="company">Company:</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} /><br />
                    </div>
                )}
                <button type="submit" id="registerButton" onClick={handleSubmit}
                    className="registerResumeButton">Register</button>

            </form>
            <p>{registerMessage}</p>

        </div>
    );
}

export default Register;

