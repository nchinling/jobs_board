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
            <div className="pageMargin">
                <h1>Welcome to Jobs AI, a portal for job seekers.</h1>
                <h1 className='JobsH1'>All Jobs</h1>

                {jobs && jobs.length > 0 ? (
                    <ul>
                        {jobs.map((job) => (
                            <li className='JobUl' key={job.id}>
                                <h2 className='JobH2'>{job.position}</h2>
                                <h3 className='JobH3'>{job.company}</h3>
                                <p>Level: {job.level}</p>
                                <p>Pay: {job.pay}</p>
                                <h3>Location</h3>
                                <p>Country: {job.country}</p>
                                <p>Region: {job.region}</p>
                                <h3>Job Description</h3>
                                <p>{job.job_description}</p>
                                <h3>Job Requirement</h3>
                                <p>{job.job_requirement}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No jobs available at the moment.</p>
                )}

            </div>
        </div >
    );

};

export default AllJobs;
