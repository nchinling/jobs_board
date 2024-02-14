import React, { useState, useEffect } from 'react';
import '../css/Page.css';
import axios from 'axios';

const URL_API = 'http://localhost:8000/api/jobs_board';

const AllJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`${URL_API}/get_all_jobs`);
                setJobs(response.data.jobs);
            } catch (error) {
                console.error(error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="JobsContainer">
            <h1 className='JobsH1'>All Jobs</h1>
            <ul>
                {jobs.map((job) => (
                    <li className='JobUl' key={job.id}>
                        <h2 className='JobH2'>{job.position[0].position}</h2>
                        <h3 className='JobH3'>{job.company[0].company}</h3>
                        <p>Level: {job.position[0].level}</p>
                        <p>Pay: {job.position[0].pay}</p>
                        <h3>Location</h3>
                        <p>Country: {job.location[0].country}</p>
                        <p>Region: {job.location[0].region}</p>
                        <h3>Job Description</h3>
                        <p>{job.jobDescription[0].job_description}</p>
                        <h3>Job Requirement</h3>
                        <p>{job.jobRequirement[0].job_requirement}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

};

export default AllJobs;
