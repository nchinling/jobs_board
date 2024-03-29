import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/Page.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const URL_API = 'http://localhost:8000/api/jobs_board';

function CreateProfile() {
    const [currentPage, setCurrentPage] = useState(1);

    const location = useLocation();
    const { resumeData } = location.state;

    useEffect(() => {
        console.log('resumeData:', resumeData);
        // Your code to handle resumeData...
    }, [resumeData]);


    const pages = [
        { fields: ['firstName', 'lastName'], label: 'Personal Information' },
        { fields: ['email', 'phoneNumber'], label: 'Contact' },
        { fields: ['country', 'streetAddress', 'city', 'postCode'], label: 'Where are you located?' },
        {
            fields: ['levelOfEducation', 'fieldOfStudy', 'schoolName', 'countryOfStudy', 'studiedFrom', 'studiedUntil'],
            label: 'Add Education'
        },
        {
            fields: ['jobTitle', 'company', 'countryOfWork', 'workedFrom', 'workedUntil', 'description'],
            label: 'Add Work Experience'
        },

    ];


    const [personalInformation, setPersonalInformation] = useState([
        {
            firstName: "Chin Lingz",
            lastName: "Ng",
        },
    ]);


    const [contact, setContact] = useState([
        {
            email: "nchinling@gmail.com",
            phoneNumber: "94892015",
        },
    ]);

    const [address, setAddress] = useState([
        {
            country: "Singapore",
            streetAddress: "86 Dawson Road",
            city: "Singapore",
            postCode: "141086",
        },
    ]);

    const [educationEntries, setEducationEntries] = useState([
        {
            levelOfEducation: "Masters",
            fieldOfStudy: "Engineering",
            schoolName: "Harvard",
            countryOfStudy: "USA",
            studiedFrom: null,
            studiedUntil: null,
        },
    ]);

    const [workEntries, setWorkEntries] = useState([
        {
            jobTitle: "Lead Architect",
            company: "Google",
            countryOfWork: "Singapore",
            workedFrom: null,
            workedUntil: null,
            description: "Program"
        },
    ]);

    const [registerMessage, setRegisterMessage] = useState(null);

    // const handleChange = (event, entryIndex, fieldIndex) => {
    //     const { name, value } = event.target;
    //     // const updatedFormData = [...formData];
    //     // updatedFormData[entryIndex] = {
    //     //     ...updatedFormData[entryIndex],
    //     //     [name]: value,
    //     // };
    //     // setFormData(updatedFormData);

    //     const updatedAddress = [...address];
    //     updatedAddress[entryIndex] = {
    //         ...updatedAddress[entryIndex],
    //         [name]: value,
    //     };
    //     setAddress(updatedAddress);

    //     const updatedContact = [...contact];
    //     updatedContact[entryIndex] = {
    //         ...updatedContact[entryIndex],
    //         [name]: value,
    //     };
    //     setContact(updatedContact);

    //     const updatedPersonalInformation = [...personalInformation];
    //     updatedPersonalInformation[entryIndex] = {
    //         ...updatedPersonalInformation[entryIndex],
    //         [name]: value,
    //     };
    //     setPersonalInformation(updatedPersonalInformation);


    //     const updatedEducationEntries = [...educationEntries];
    //     updatedEducationEntries[entryIndex] = {
    //         ...updatedEducationEntries[entryIndex],
    //         [name]: value,
    //     };
    //     setEducationEntries(updatedEducationEntries);

    //     const updatedWorkEntries = [...workEntries];
    //     updatedWorkEntries[entryIndex] = {
    //         ...updatedWorkEntries[entryIndex],
    //         [name]: value,
    //     };
    //     setWorkEntries(updatedWorkEntries);
    // };

    const handleChange = (event, entryIndex, pageIndex) => {
        const { name, value } = event.target;
        const [section, field] = name.split('-'); // Split the name into section and field

        // Update the state based on the section
        switch (section) {
            case 'personalInformation':
                const updatedPersonalInformation = [...personalInformation];
                updatedPersonalInformation[entryIndex] = {
                    ...updatedPersonalInformation[entryIndex],
                    [field]: value,
                };
                setPersonalInformation(updatedPersonalInformation);
                break;
            case 'address':
                const updatedAddress = [...address];
                updatedAddress[entryIndex] = {
                    ...updatedAddress[entryIndex],
                    [field]: value,
                };
                setAddress(updatedAddress);
                break;
            case 'contact':
                const updatedContact = [...contact];
                updatedContact[entryIndex] = {
                    ...updatedContact[entryIndex],
                    [field]: value,
                };
                setContact(updatedContact);
                break;
            case 'educationEntries':
                const updatedEducationEntries = [...educationEntries];
                updatedEducationEntries[entryIndex] = {
                    ...updatedEducationEntries[entryIndex],
                    [field]: value,
                };
                setEducationEntries(updatedEducationEntries);
                break;
            case 'workEntries':
                const updatedWorkEntries = [...workEntries];
                updatedWorkEntries[entryIndex] = {
                    ...updatedWorkEntries[entryIndex],
                    [field]: value,
                };
                setWorkEntries(updatedWorkEntries);
                break;
            default:

                break;
        }
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
        console.log(`handleWorkDateChange called with date ${date} for field ${fieldName}, entryIndex ${entryIndex}`);
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
            const response = await axios.post(`${URL_API}/create_resume`, {
                // ...formData,
                personalInformation,
                contact,
                address,
                educationEntries,
                workEntries
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
                countryOfStudy: "",
                studiedFrom: null,
                studiedUntil: null,
            },
        ]);
    };

    const addWorkEntry = () => {
        setWorkEntries((prevEntries) => [
            ...prevEntries,
            {
                jobTitle: "",
                company: "",
                countryOfWork: "Singapore",
                workedFrom: null,
                workedUntil: null,
                description: ""
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

                            {/* Generate Address page */}
                            {page.label === "Where are you located?" && (
                                address.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={field}
                                                    name={`address-${field}`}
                                                    value={entry[field]}
                                                    onChange={(event) =>
                                                        handleChange(event, entryIndex, pageIndex)
                                                    }
                                                />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}




                            {/* Generate Contact page */}
                            {page.label === "Contact" && (
                                contact.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={field}
                                                    name={`contact-${field}`}
                                                    value={entry[field]}
                                                    onChange={(event) =>
                                                        handleChange(event, entryIndex, pageIndex)
                                                    }
                                                />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}


                            {/* Generate Personal Information page */}
                            {page.label === "Personal Information" && (
                                personalInformation.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={field}
                                                    // name={field}
                                                    name={`personalInformation-${field}`}
                                                    value={entry[field]}
                                                    onChange={(event) =>
                                                        handleChange(event, entryIndex, pageIndex)
                                                    }
                                                />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}


                            {/* Generate Add Education page */}
                            {page.label === "Add Education" && educationEntries.map((entry, entryIndex) => (
                                <div key={`${pageIndex}-${entryIndex}`}>
                                    <h3>Education {entryIndex + 1}</h3>

                                    {page.fields.map((field) => (
                                        <div key={field}>
                                            {field === "studiedFrom" || field === "studiedUntil" ? (
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
                                                        name={`educationEntries-${field}`}
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

                            {/* Generate work experience page */}
                            {page.label === "Add Work Experience" && workEntries.map((entry, entryIndex) => (
                                <div key={`${pageIndex}-${entryIndex}`}>
                                    <h3>Work{entryIndex + 1}</h3>

                                    {page.fields.map((field) => (
                                        <div key={field}>
                                            {field === "workedFrom" || field === "workedUntil" ? (
                                                <div>
                                                    <label htmlFor={field}>
                                                        {formatLabel(field)}:
                                                    </label>
                                                    <DatePicker
                                                        selected={entry[field]}
                                                        onChange={(date) =>
                                                            handleWorkDateChange(date, field, entryIndex)
                                                        }
                                                        dateFormat="MMM yyyy"
                                                        showMonthYearPicker
                                                    />
                                                </div>
                                            ) : field === "description" ? (
                                                <div>
                                                    <label htmlFor={field}>
                                                        {formatLabel(field)}:
                                                    </label>
                                                    <textarea
                                                        id={field}
                                                        name={`workEntries-${field}`}
                                                        value={entry[field]}
                                                        onChange={(event) =>
                                                            handleChange(event, entryIndex, pageIndex)
                                                        }
                                                    />
                                                    <br />
                                                </div>
                                            ) : (
                                                <div>
                                                    <label htmlFor={field}>
                                                        {formatLabel(field)}:
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id={field}
                                                        name={`workEntries-${field}`}
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

                            {/* {page.label === "Add Work Experience" && workEntries.map((entry, entryIndex) => (
                                <div key={`${pageIndex}-${entryIndex}`}>
                                    <h3>Work{entryIndex + 1}</h3>

                                    {page.fields.map((field) => (
                                        <div key={field}>
                                            {field === "workedFrom" || field === "workedUntil" ? (
                                                <div>
                                                    <label htmlFor={field}>
                                                        {formatLabel(field)}:
                                                    </label>
                                                    <DatePicker
                                                        selected={entry[field]}
                                                        onChange={(date) =>
                                                            handleWorkDateChange(date, field, entryIndex)
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
                                                        // name={field}
                                                        name={`workEntries-${field}`}
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
                            ))} */}
                            {page.label === "Add Education" && (
                                <button
                                    type="button"
                                    onClick={addEducationEntry}
                                    className="addButton">
                                    Add education
                                </button>
                            )}

                            {page.label === "Add Work Experience" && (
                                <button
                                    type="button"
                                    onClick={addWorkEntry}
                                    className="addButton">
                                    Add work
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
                        className="registerButton"
                    >
                        Register
                    </button>
                )}
            </form>
            <p>{registerMessage}</p>
        </div>
    );
}

export default CreateProfile;
