import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/Page.css';
import axios from 'axios';

const URL_API = 'http://localhost:8000/api/jobs_board';

function Profile() {
    const [currentPage, setCurrentPage] = useState(1);

    const pages = [
        { fields: ['firstName', 'lastName'], label: 'Personal Information' },
        { fields: ['email', 'phoneNumber'], label: 'Contact' },
        { fields: ['country', 'streetAddress', 'city', 'postCode'], label: 'Where are you located?' },
        {
            fields: ['levelOfEducation', 'fieldOfStudy', 'schoolName', 'country', 'fromDate', 'toDate'],
            label: 'Add Education'
        },
        { fields: ['occupation'], label: 'Occupation' },
    ];

    const [formData, setFormData] = useState({
        firstName: "Chin Ling",
        lastName: "Ng",
        email: "nchinling@gmail.com",
        phoneNumber: "94892015",
        country: "Singapore",
        streetAddress: "86 Dawson Road",
        city: "Singapore",
        postCode: "141086",
        levelOfEducation: "",
        fieldOfStudy: "",
        schoolName: "",
        fromDate: null,
        toDate: null,
        occupation: "Software engineer",
    });

    const [registerMessage, setRegisterMessage] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleDateChange = (date, fieldName) => {
        setFormData((prevFormData) => ({ ...prevFormData, [fieldName]: date }));
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

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const formatLabel = (fieldName) => {
        return fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="container" style={{ height: '750px' }}>
            <div className="page-header">
                <h3>Page {currentPage} of {pages.length}</h3>
                <div className="progress-bar">
                    <div className="progress" style={{ width: `${(currentPage / pages.length) * 100}%` }}></div>
                </div>
            </div>

            <form>
                {pages.map((page, index) => (
                    index + 1 === currentPage && (
                        <div key={index}>
                            <h2>{page.label}</h2>
                            {page.fields.map((field) => (
                                <div key={field}>
                                    {field === 'fromDate' || field === 'toDate' ? (
                                        <div>
                                            <label htmlFor={field}>{formatLabel(field)}:</label>
                                            <DatePicker
                                                selected={formData[field]}
                                                onChange={(date) => handleDateChange(date, field)}
                                                dateFormat="MM/yyyy"
                                                showMonthYearPicker
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor={field}>{formatLabel(field)}:</label>
                                            <input
                                                type="text"
                                                id={field}
                                                name={field}
                                                value={formData[field]}
                                                onChange={handleChange}
                                            /><br />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )
                ))}

                <button type="button" onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                {currentPage < pages.length ? (
                    <button type="button" onClick={goToNextPage}>
                        Next
                    </button>
                ) : (
                    <button type="button" onClick={handleSubmit} id="registerButton">
                        Register
                    </button>
                )}
            </form>
            <p>{registerMessage}</p>
        </div>
    );
}

export default Profile;
