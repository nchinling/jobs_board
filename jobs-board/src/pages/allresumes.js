import React, { useState, useEffect } from 'react';
import '../css/Page.css';
import axios from 'axios';

const URL_API = 'http://localhost:8000/api/jobs_board';

const AllResumes = () => {
	const [resumes, setResumes] = useState([]);

	useEffect(() => {
		const fetchResumes = async () => {
			try {
				const response = await axios.get(`${URL_API}/get_all_resumes`);
				setResumes(response.data.resumes);
			} catch (error) {
				console.error(error);
			}
		};

		fetchResumes();
	}, []);

	return (
		<div className="ResumeContainer">
			<h1 className='ResumeH1'>All Resumes</h1>
			<ul>
				{resumes.map((resume) => (
					<li className='ResumeUl' key={resume.id}>
						<h2 className='ResumeH2'>Resume {resume.id}</h2>
						<h3 className='ResumeH3'>Name</h3>
						<p className='ResumeP'>First Name: {resume.personal_information[0].firstName}</p>
						<p>Last Name: {resume.personal_information[0].lastName}</p>
						<h3>Contact</h3>
						<p>Email: {resume.contact[0].email}</p>
						<p>Phone Number: {resume.contact[0].phoneNumber}</p>
						<h3>Address</h3>
						<p>Street Address: {resume.address[0].streetAddress}</p>
						<p>City: {resume.address[0].city}</p>
						<p>Post Code: {resume.address[0].postCode}</p>
						<p>Country: {resume.address[0].country}</p>
						<h3>Education</h3>
						<ul>
							{resume.education_entries.map((education) => (
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
							{resume.work_entries.map((workEntry) => (
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
					</li>
				))}
			</ul>
		</div>
	);

};

export default AllResumes;
