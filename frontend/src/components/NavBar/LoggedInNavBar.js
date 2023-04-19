import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { setModal } from '../../store/modal';
import { useSelector } from 'react-redux';
import QuestForm from '../Modals/QuestForm';

const LoggedInNavBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalState = useSelector(state => state.modals?.modalState)

    function createClick(){
        dispatch(setModal("questForm"))
    }

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
                <button>
                    <div className="create-quest-nav-button" onClick={createClick}>create quest</div>
                </button>
                <QuestForm />
                <NavLink exact to="/">
                    <div className="user-icon-holder">
                        <i className="fa-solid fa-user"></i>                    
                    </div>                
                </NavLink>

                <button className="logout-button" onClick={logoutUser}>log out</button>
            </div>
        </nav>
    );
}

export default LoggedInNavBar;