import React from "react";
import { Nav, NavLink, NavMenu, Title }
    from "./NavbarElements";

const Navbar = () => {
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
                    <NavLink to="/allresumes" activeStyle>
                        All Resumes
                    </NavLink>
                    <NavLink to="/articles" activeStyle>
                        Articles
                    </NavLink>
                    <NavLink to="/login" activeStyle>
                        Login
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
