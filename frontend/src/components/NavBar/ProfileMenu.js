import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory } from "react-router-dom";

//canpassinuser
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

  return (
    <>
      <img src={"https://magellan-seeds.s3.amazonaws.com/mag_white_small.png"} className="nav-avatar" alt="avatar" onClick={openMenu}/>
      {showMenu && (
        <div className="profile-dropdown">
          <Link to={"/user-profile"} className="drop-down-option">Profile</Link>
          <Link to={"/quests"} className="drop-down-option">Create Quest</Link>
          <div className="drop-down-option" onClick={logout}>Log out</div>
        </div>
      )}
    </>
  );
}

export default ProfileMenu;