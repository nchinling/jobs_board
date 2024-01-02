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
        {
            fields: ['jobTitle', 'company', 'country', 'fromDate', 'toDate', 'description'],
            label: 'Add Work Experience'
        },

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
        jobTitle: "",
        company: "",
        country: "",
        fromDate: null,
        toDate: null,
        description: ""

    });

    const [educationEntries, setEducationEntries] = useState([
        {
            levelOfEducation: "",
            fieldOfStudy: "",
            schoolName: "",
            country: "",
            fromDate: null,
            toDate: null,
        },
    ]);

    const [workEntries, setWorkEntries] = useState([
        {
            jobTitle: "",
            company: "",
            country: "",
            fromDate: null,
            toDate: null,
            description: ""
        },
    ]);

    const [registerMessage, setRegisterMessage] = useState(null);

    const handleChange = (event, entryIndex, fieldIndex) => {
        const { name, value } = event.target;
        const updatedEducationEntries = [...educationEntries];
        updatedEducationEntries[entryIndex] = {
            ...updatedEducationEntries[entryIndex],
            [name]: value,
        };
        setEducationEntries(updatedEducationEntries);

        const updatedWorkEntries = [...workEntries];
        updatedWorkEntries[entryIndex] = {
            ...updatedWorkEntries[entryIndex],
            [name]: value,
        };
        setWorkEntries(updatedWorkEntries);
    };

    const handleEducationDateChange = (date, fieldName, entryIndex) => {
        const updatedEducationEntries = [...educationEntries];
        updatedEducationEntries[entryIndex] = {
            ...updatedEducationEntries[entryIndex],
            [fieldName]: date,
        };
        setEducationEntries(updatedEducationEntries);
    };

    const handleWorkDateChange = (date, fieldName, entryIndex) => {
        const updatedWorkEntries = [...workEntries];
        updatedWorkEntries[entryIndex] = {
            ...updatedWorkEntries[entryIndex],
            [fieldName]: date,
        };
        setWorkEntries(updatedWorkEntries);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/create-user-account`, {
                ...formData,
                educationEntries,
            });
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

    const addEducationEntry = () => {
        setEducationEntries((prevEntries) => [
            ...prevEntries,
            {
                levelOfEducation: "",
                fieldOfStudy: "",
                schoolName: "",
                country: "",
                fromDate: null,
                toDate: null,
            },
        ]);
    };

    const formatLabel = (fieldName) => {
        return fieldName.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
    };

    return (
        <div className="container" style={{ height: "750px" }}>
            <div className="page-header">
                <h3>Page {currentPage} of {pages.length}</h3>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{ width: `${(currentPage / pages.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <form>
                {pages.map((page, pageIndex) => (
                    pageIndex + 1 === currentPage && (
                        <div key={pageIndex}>
                            <h2>{page.label}</h2>

                            {educationEntries.map((entry, entryIndex) => (
                                <div key={`${pageIndex}-${entryIndex}`}>

                                    {page.fields.map((field) => (
                                        <div key={field}>
                                            {field === "fromDate" || field === "toDate" ? (
                                                <div>
                                                    <label htmlFor={field}>
                                                        {formatLabel(field)}:
                                                    </label>
                                                    <DatePicker
                                                        selected={entry[field]}
                                                        onChange={(date) =>
                                                            handleEducationDateChange(date, field, entryIndex)
                                                        }
                                                        dateFormat="MMM yyyy"
                                                        showMonthYearPicker
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <label htmlFor={field}>
                                                        {formatLabel(field)}:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={field}
                                                        name={field}
                                                        value={entry[field]}
                                                        onChange={(event) =>
                                                            handleChange(event, entryIndex, pageIndex)
                                                        }
                                                    />
                                                    <br />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                            {page.label === "Add Education" && (
                                <button
                                    type="button"
                                    onClick={addEducationEntry}
                                >
                                    Add another education
                                </button>
                            )}
                        </div>
                    )
                ))}
                <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="previousNextButtons"
                >
                    Previous
                </button>
                {currentPage < pages.length ? (
                    <button type="button" onClick={goToNextPage} className="previousNextButtons">
                        Next
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="registerResumeButton"
                    >
                        Register
                    </button>
                )}
            </form>
            <p>{registerMessage}</p>
        </div>
    );
}

export default Profile;
