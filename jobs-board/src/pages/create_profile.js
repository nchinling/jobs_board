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
        if (resumeData) {
            setPersonalInformation(resumeData[0].personal_information);
            setContact(resumeData[0].contact);
            setAddress(resumeData[0].address);
            // setEducationEntries(resumeData[0].education_entries);
            setEducationEntries(resumeData[0].education_entries.map(entry => ({
                ...entry,
                studiedFrom: new Date(entry.studiedFrom),
                studiedUntil: new Date(entry.studiedUntil)
                // workedFrom: new Date(),
                // workedUntil: new Date()
            })));
            // setWorkEntries(resumeData[0].work_entries);
            setWorkEntries(resumeData[0].work_entries.map(entry => ({
                ...entry,
                workedFrom: new Date(entry.workedFrom),
                workedUntil: new Date(entry.workedUntil)
            })))
        }
    }, [resumeData]);

    // const parsedWorkEntries = workEntries.map(entry => ({
    //     ...entry,
    //     workedFrom: new Date(entry.workedFrom),
    //     workedUntil: new Date(entry.workedUntil)
    // }));


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
            firstName: "",
            lastName: "",
        },
    ]);


    const [contact, setContact] = useState([
        {
            email: "",
            phoneNumber: "",
        },
    ]);

    const [address, setAddress] = useState([
        {
            country: "",
            streetAddress: "",
            city: "",
            postCode: "",
        },
    ]);

    const [educationEntries, setEducationEntries] = useState([
        {
            levelOfEducation: "",
            fieldOfStudy: "",
            schoolName: "",
            countryOfStudy: "",
            studiedFrom: null,
            studiedUntil: null,
        },
    ]);

    const [workEntries, setWorkEntries] = useState([
        {
            jobTitle: "",
            company: "",
            countryOfWork: "",
            workedFrom: null,
            workedUntil: null,
            description: ""
        },
    ]);

    const [registerMessage, setRegisterMessage] = useState(null);


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
                studiedFrom: "",
                studiedUntil: "",
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
                workedFrom: "",
                workedUntil: "",
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
