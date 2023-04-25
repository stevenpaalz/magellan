import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import ProfileMenu from './ProfileMenu';

const LoggedInNavBar = () => {  
    return (
        <nav>
            <div className="nav-left">
                <NavLink exact to="/quests">
                    <img src="../../../assets/headerlogo.png" alt="Logo" className="nav-bar-logo"/>
                </NavLink>
            </div>
            <div className="nav-right">   
                <NavLink exact to="/about">
                    <div className="nav-button">about</div>
                </NavLink> 

                <ProfileMenu />
            </div>
        </nav>
    );
}

export default LoggedInNavBar;