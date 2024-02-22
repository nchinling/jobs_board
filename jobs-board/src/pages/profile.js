import React from 'react';
import '../css/Page.css';

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
    return (
        < div className="pageMargin" >
            <h1>This is my profile page</h1>

        </div >
    );
};

export default Profile;
