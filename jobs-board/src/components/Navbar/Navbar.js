import React from "react";
import { Nav, NavLink, NavMenu, Title }
    from "./NavbarElements";

const Navbar = ({ isLoggedIn }) => {
    return (
        <>
            <Nav>
                <Title>
                    GIANT Jobs
                </Title>
                <NavMenu>
                    <NavLink to="/home" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/profile" activeStyle>
                        Profile
                    </NavLink>
                    {isLoggedIn && (
                        <>
                            <NavLink to="/postjob" activeStyle>
                                Post Job
                            </NavLink>
                            <NavLink to="/allresumes" activeStyle>
                                All Resumes
                            </NavLink>
                        </>
                    )}
                    {/* <NavLink to="/postjob" activeStyle>
                        Post Job
                    </NavLink>
                    <NavLink to="/allresumes" activeStyle>
                        All Resumes
                    </NavLink> */}
                    <NavLink to="/articles" activeStyle>
                        Articles
                    </NavLink>
                    {!isLoggedIn && (
                        <>
                            <NavLink to="/login" activeStyle>
                                Login
                            </NavLink>
                            <NavLink to="/register" activeStyle>
                                Register
                            </NavLink>
                        </>
                    )}
                    {/* <NavLink to="/login" activeStyle>
                        Login
                    </NavLink>
                    <NavLink to="/register" activeStyle>
                        Register
                    </NavLink> */}

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
