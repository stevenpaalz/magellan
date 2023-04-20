import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import ProfileMenu from './ProfileMenu';

const LoggedInNavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

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