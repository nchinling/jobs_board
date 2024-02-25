import React, { useEffect, useState } from 'react';
import '../css/Page.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL_API = 'http://localhost:8000/api/jobs_board'

const Profile = ({ email }) => {
    console.info('The email in Profile is ', email)
    const navigate = useNavigate();

    const [resumeData, setResumeData] = useState();

    useEffect(() => {

        const fetchResume = async () => {
            try {
                const response = await axios.get(`${URL_API}/get_resume`, {
                    email
                });
                console.info('the resume received is ', response.data.resume)
                setResumeData(response.data.resume);
                if (response.data.resume === '') {
                    // Redirect to /create_profile
                    navigate('/create_profile');
                } else {
                    // Set resume data
                    console.info('I am inside else')
                    setResumeData(response.data.resume);
                    console.info('ResumeData has value of ', resumeData)
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchResume();
    }, [email]);

    useEffect(() => {
        console.info('ResumeData has value of ', resumeData);
    }, [resumeData]);

    const handleEdit = () => {
        navigate('/edit_profile');
    };
    return (
        <div className="pageMargin">
            <h1>This is my profile page</h1>
            <button onClick={handleEdit}>Edit Profile</button> {/* Edit button */}
            {resumeData && resumeData.length > 0 && (
                <div className='ResumeContainer'>
                    <h2 className='ResumeH2'>Resume {resumeData[0].id}</h2>
                    <h3 className='ResumeH3'>Name</h3>
                    <p className='ResumeP'>First Name: {resumeData[0].personal_information[0].firstName}</p>
                    <p>Last Name: {resumeData[0].personal_information[0].lastName}</p>
                    <h3>Contact</h3>
                    <p>Email: {resumeData[0].contact[0].email}</p>
                    <p>Phone Number: {resumeData[0].contact[0].phoneNumber}</p>
                    <h3>Address</h3>
                    <p>Street Address: {resumeData[0].address[0].streetAddress}</p>
                    <p>City: {resumeData[0].address[0].city}</p>
                    <p>Post Code: {resumeData[0].address[0].postCode}</p>
                    <p>Country: {resumeData[0].address[0].country}</p>
                    <h3>Education</h3>
                    <ul>
                        {resumeData[0].education_entries.map((education) => (
                            <li className='ResumeLi' key={education.id}>
                                <p>Level of Education: {education.levelOfEducation}</p>
                                <p>Field of Study: {education.fieldOfStudy}</p>
                                <p>School Name: {education.schoolName}</p>
                                <p>Country of Study: {education.countryOfStudy}</p>
                                <p>Studied From: {education.studiedFrom}</p>
                                <p>Studied Until: {education.studiedUntil}</p>
                            </li>
                        ))}
                    </ul>
                    <h3>Work Experience</h3>
                    <ul>
                        {resumeData[0].work_entries.map((workEntry) => (
                            <li className='ResumeLi' key={workEntry.id}>
                                <p>Job Title: {workEntry.jobTitle}</p>
                                <p>Company: {workEntry.company}</p>
                                <p>Country of Work: {workEntry.countryOfWork}</p>
                                <p>Worked From: {workEntry.workedFrom}</p>
                                <p>Worked Until: {workEntry.workedUntil}</p>
                                <p>Description: {workEntry.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

};

export default Profile;
