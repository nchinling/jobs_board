import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import '../css/Page.css';
import axios from 'axios';

const URL_API = 'http://localhost:8000/api/jobs_board';

function PostJob() {
    const [currentPage, setCurrentPage] = useState(1);

    const pages = [
        { fields: ['company'], label: 'Company' },
        { fields: ['position', 'level', 'pay'], label: 'Position' },
        { fields: ['country', 'region'], label: 'Location' },
        { fields: ['job_description'], label: 'Job Description' },
        { fields: ['job_requirement'], label: 'Job Requirement' }
    ];

    const [company, setCompany] = useState([
        {
            company: "Creative Technology"
        },
    ]);


    const [position, setPosition] = useState([
        {
            position: "Technical Lead (Software Engineering)",
            level: "Management",
            pay: "$9000 - $12000",
            // location: "Singapore"
        },
    ]);

    const [location, setLocation] = useState([
        {
            country: "Singapore",
            region: "Central"
        },
    ]);

    const [jobDescription, setJobDescription] = useState([
        {
            job_description: "- Lead a team of software engineers",
        },
    ]);

    const [jobRequirement, setJobRequirement] = useState([
        {
            job_requirement: "- Bachelor of Engineering/Computer Science/Information Systems"
        },
    ]);

    const [postJobMessage, setPostJobMessage] = useState(null);

    const handleChange = (event, entryIndex, pageIndex) => {
        const { name, value } = event.target;
        const [section, field] = name.split('-');

        // Update the state based on the section
        switch (section) {
            case 'company':
                const updatedCompany = [...company];
                updatedCompany[entryIndex] = {
                    ...updatedCompany[entryIndex],
                    [field]: value,
                };
                setCompany(updatedCompany);
                break;
            case 'position':
                const updatedPosition = [...position];
                updatedPosition[entryIndex] = {
                    ...updatedPosition[entryIndex],
                    [field]: value,
                };
                setPosition(updatedPosition);
                break;
            case 'location':
                const updatedLocation = [...location];
                updatedLocation[entryIndex] = {
                    ...updatedLocation[entryIndex],
                    [field]: value,
                };
                setLocation(updatedLocation);
                break;
            case 'jobDescription':
                const updatedJobDescription = [...jobDescription];
                updatedJobDescription[entryIndex] = {
                    ...updatedJobDescription[entryIndex],
                    [field]: value,
                };
                setJobDescription(updatedJobDescription);
                break;
            case 'jobRequirement':
                const updatedJobRequirement = [...jobRequirement];
                updatedJobRequirement[entryIndex] = {
                    ...updatedJobRequirement[entryIndex],
                    [field]: value,
                };
                setJobRequirement(updatedJobRequirement);
                break;
            default:

                break;
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/create_job`, {
                company,
                position,
                location,
                jobDescription,
                jobRequirement
            });
            setPostJobMessage(response.data.postJobMessage);

            console.log("Received back response: " + response.data.postJobMessage);
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

                            {/* Generate Company page */}
                            {page.label === "Company" && (
                                company.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={field}
                                                    name={`company-${field}`}
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


                            {/* Generate Position page */}
                            {page.label === "Position" && (
                                position.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={field}
                                                    name={`position-${field}`}
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


                            {/* Generate Location page */}
                            {page.label === "Location" && (
                                location.map((entry, entryIndex) => (
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
                                                    name={`location-${field}`}
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


                            {/* Generate Job Description page */}
                            {page.label === "Job Description" && (
                                jobDescription.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <textarea

                                                    id={field}
                                                    name={`jobDescription-${field}`}
                                                    value={entry[field]}
                                                    onChange={(event) =>
                                                        handleChange(event, entryIndex, pageIndex)
                                                    }
                                                    rows={15}
                                                    cols={40}
                                                    style={{ width: '100%' }} // 
                                                />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                ))
                            )}


                            {/* Generate Job Requirement page */}
                            {page.label === "Job Requirement" && (
                                jobRequirement.map((entry, entryIndex) => (
                                    <div key={`${pageIndex}-${entryIndex}`}>
                                        {page.fields.map((field) => (
                                            <div key={field}>
                                                <label htmlFor={field}>
                                                    {formatLabel(field)}:
                                                </label>
                                                <textarea

                                                    id={field}
                                                    // name={field}
                                                    name={`jobRequirement-${field}`}
                                                    value={entry[field]}
                                                    onChange={(event) =>
                                                        handleChange(event, entryIndex, pageIndex)
                                                    }
                                                    rows={15}
                                                    cols={40}
                                                    style={{ width: '100%' }}
                                                />
                                                <br />
                                            </div>
                                        ))}
                                    </div>
                                ))
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
            <p>{postJobMessage}</p>
        </div>
    );
}

export default PostJob;
