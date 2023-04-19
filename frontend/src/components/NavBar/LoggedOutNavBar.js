import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import LoginForm from '../Modals/LoginForm';
import SignUpForm from '../Modals/SignupForm';
import { setModal } from '../../store/modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const LoggedOutNavBar = () => {
    const dispatch = useDispatch()
    const modalState = useSelector(state => state.modals?.modalState)
    function signupClick(){
        dispatch(setModal("signUp"))
    }
    function loginClick(){
        dispatch(setModal("logIn"))
    }
    useEffect(() => {
        if (!modalState) return;
        const closeModals = (e) => {
          if(e.target.classList.contains("login-signup-form")|| e.target.parentElement?.classList.contains("login-signup-form")||e.target.parentElement?.parentElement?.classList.contains("login-signup-form")||e.target.parentElement?.parentElement?.parentElement?.classList.contains("login-signup-form")||e.target.parentElement?.parentElement?.parentElement?.parentElement?.classList.contains("login-signup-form")) return;
          dispatch(setModal(false));
        };
        document.addEventListener('click', closeModals);
        return () => document.removeEventListener("click", closeModals);
      }, [modalState, dispatch]);

    return(
        <nav>
        <div className="nav-left">
            <NavLink exact to="/">
                <img src="../../../assets/headerlogo.png" alt="Logo" className="nav-bar-logo"/>
            </NavLink>
        </div>
        <div className="nav-right">
        <button className="signup-button" onClick={signupClick}>sign up</button>    
        <button className="login-button" onClick={loginClick}>log in</button>                    
        <LoginForm />
        <SignUpForm />
        </div>
        </nav>
    )
}

export default LoggedOutNavBar;