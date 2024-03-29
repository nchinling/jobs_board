import React, { useEffect } from "react";
import { Nav, NavLink, NavMenu, Title }
    from "./NavbarElements";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';


const URL_API = 'http://localhost:8000/api/jobs_board'

const activeStyle = {
    fontWeight: "bold",
    color: "red"
};

const Navbar = ({ isLoggedIn, setIsLoggedIn, isEmployer, setIsEmployer, setEmail }) => {


    const [logoutMessage, setLogoutMessage] = useState(null);
    const navigate = useNavigate();
    // const handleLogout = navigate('/');

    // console.info('setEmail is:', setEmail)

    console.info('isEmployer in Navbar is:', isEmployer)

    const handleLogout = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${URL_API}/logout-account`);
            setLogoutMessage(response.data.logoutMessage);
            console.log("Received back response: " + response.data.logoutMessage);
            if (response.data.logoutMessage === 'Logged out successfully') {
                // setIsLoggedIn(true);
                setIsLoggedIn(false);
                setIsEmployer(false);
                navigate('/');
            }


        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <Nav>
                <Title>
                    GIANT Jobs
                </Title>
                <NavMenu>
                    {isLoggedIn && isEmployer ? (
                        <>
                            <NavLink to="/" activeStyle>
                                Home
                            </NavLink>
                            <NavLink to="/postjob" activeStyle>
                                Post Job
                            </NavLink>
                            <NavLink to="/allresumes" activeStyle>
                                All Resumes
                            </NavLink>
                            <NavLink onClick={handleLogout} activeStyle={activeStyle}>
                                Log out
                            </NavLink>
                        </>
                    ) : isLoggedIn && !isEmployer ? (
                        <>
                            <NavLink to="/" activeStyle>
                                Home
                            </NavLink>
                            <NavLink to="/profile" activeStyle>
                                Profile
                            </NavLink>
                            <NavLink onClick={handleLogout} activeStyle={activeStyle}>
                                Log out
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/" activeStyle>
                                Home
                            </NavLink>
                            <NavLink to="/login" activeStyle>
                                Login
                            </NavLink>
                            <NavLink to="/register" activeStyle>
                                Register
                            </NavLink>
                        </>
                    )}

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
