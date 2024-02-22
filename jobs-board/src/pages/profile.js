import React, { useEffect, useState } from 'react';
import '../css/Page.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const URL_API = 'http://localhost:8000/api/jobs_board'


// const getProfile = async (event) => {
//     event.preventDefault();

//     try {
//         const response = await axios.post(`${URL_API}/get_resume`, {
//             // ...formData,
//             personalInformation,
//             contact,
//             address,
//             educationEntries,
//             workEntries
//         });
//         setRegisterMessage(response.data.registerMessage);

//         console.log("Received back response: " + response.data.registerMessage);
//     } catch (error) {
//         console.error(error);
//     }
// };


const Profile = ({ email }) => {
    console.info('The email in Profile is ', email)
    const navigate = useNavigate();

    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {

        const fetchResume = async () => {
            try {
                const response = await axios.post(`${URL_API}/get_resume`, {
                    email
                });
                console.info('the resume received is ', response.data.resume)
                if (response.data.resume === '') {
                    // Redirect to /create_profile
                    navigate('/create_profile');
                } else {
                    // Set resume data
                    console.info('I am inside else')
                    setResumeData(response.data.resume);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchResume();
    }, [email]);
    return (
        < div className="pageMargin" >
            <h1>This is my profile page</h1>

        </div >
    );
};

export default Profile;
