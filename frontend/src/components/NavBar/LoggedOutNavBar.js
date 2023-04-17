import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
//Need to import modals

const LoggedOutNavBar = () => {
    return (
        <nav>
        <div className="nav-left">
            <NavLink exact to="/">
                <img src="https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png" alt="Logo" className="nav-bar-logo"/>
            </NavLink>
        </div>
        <div className="nav-right">
                {/* <LoginFormModal />
                <SignupFormModal/> */}
        </div>
        </nav>
    )
}

export default LoggedOutNavBar;