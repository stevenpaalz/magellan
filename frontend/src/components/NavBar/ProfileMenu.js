import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory } from "react-router-dom";
import { setModal } from "../../store/modal";
import QuestForm from "../Modals/QuestForm";
import { useSelector } from "react-redux";

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

  function createClick(e){
    e.preventDefault();
    history.replace("/quests/create");
    // dispatch(setModal("questForm"))
  }

  const sessionUser = useSelector(state => state.session.user);
  return (
    <>
      <img 
        src={sessionUser?.profileImageUrl?sessionUser?.profileImageUrl:"https://magellan-seeds.s3.amazonaws.com/mag_white_small.png"} 
        className={showMenu? "active nav-avatar":"nav-avatar"} 
        alt="avatar" 
        onClick={openMenu}
      />
      {/* <QuestForm /> */}
      {showMenu && (
        <div className="profile-dropdown">
          <a href="/user-profile" className="drop-down-option"><div>Profile</div></a>
          <div className="bottom-section"><a href="/user-profile/currentEvents" className="drop-down-option"><div>Current Events</div></a></div>
          <a href="/user-profile/upcomingEvents" className="drop-down-option"><div>Upcoming Events</div></a>
          <a href="/user-profile/pastEvents" className="drop-down-option"><div>Past Events</div></a>
          <div className="bottom-section"><a onClick={createClick} className="drop-down-option"><div>Create Quest</div></a>
          <a href="/user-profile/yourQuests" className="drop-down-option"><div>Designed Quests</div></a></div>
          {/* <div className="drop-down-line">------------------------------</div> */}
          <div className="bottom-section"><div className="drop-down-option" onClick={logout}><div>Log Out</div></div></div>
        </div>
      )}
    </>
  );

}

export default ProfileMenu;