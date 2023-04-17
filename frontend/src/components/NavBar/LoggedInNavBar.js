import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

const LoggedInNavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout()).then(history.replace("/"));
  }

    return (
        <nav>
            <div className="nav-left">
                <NavLink exact to="/home">
                    <img src="https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png" alt="Logo" className="nav-bar-logo"/>
                </NavLink>
            </div>
            <div className="nav-right">   
                <NavLink exact to="/">
                    <div className="create-quest-nav-button">Create Quest</div>
                </NavLink>

                <NavLink exact to="/">
                    <div className="user-icon-holder">
                        <i className="fa-solid fa-user"></i>                    
                    </div>                
                </NavLink>

                <button className="logout-button" onClick={logoutUser}>Log Out</button>
            </div>
        </nav>
    );
}

export default LoggedInNavBar;