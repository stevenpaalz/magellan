import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory } from "react-router-dom";
import { setModal } from "../../store/modal";
import QuestForm from "../Modals/QuestForm";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
  };

  function createClick(){
    dispatch(setModal("questForm"))
    }

  return (
    <>
      <img 
        src={"https://magellan-seeds.s3.amazonaws.com/mag_white_small.png"} 
        className="nav-avatar" 
        alt="avatar" 
        onClick={openMenu}
      />
      <QuestForm />
      {showMenu && (
        <div className="profile-dropdown">
          <a href="/user-profile" className="drop-down-option"><div>Profile</div></a>
          <a onClick={createClick} className="drop-down-option"><div>Create Quest</div></a>
          <div className="drop-down-line">------------------------------</div>
          <div className="drop-down-option" onClick={logout}><div>Log out</div></div>
        </div>
      )}
    </>
  );

}

export default ProfileMenu;