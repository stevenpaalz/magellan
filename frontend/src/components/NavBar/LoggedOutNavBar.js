import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
//Need to import modals

const LoggedOutNavBar = () => {
    return (
        <nav>
        <div className="nav-left">
            <NavLink exact to="/">
                <img src="../../../assets/logo.png" alt="Logo" className="nav-bar-logo"/>
            </NavLink>
        </div>
        <div className="nav-right">
        <button className="signup-button">sign up</button>    
        <button className="login-button">log in</button>                    
                {/* <LoginFormModal />
                <SignupFormModal/> */}
        </div>
        </nav>
    )
}

export default LoggedOutNavBar;