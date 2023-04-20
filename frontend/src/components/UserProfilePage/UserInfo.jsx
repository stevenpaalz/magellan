
import { useSelector } from "react-redux"
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getUser } from "../../store/session";

export default function UserInfo(){
    // const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    // useEffect(()=>{
    //     dispatch(getUser(sessionUser._id))
    // }, [sessionUser, dispatch])
    return(
        <>
            <div className="profile-card">
            <img className="profile-page-image" src={sessionUser.profileImageUrl} alt={`${sessionUser.firstName}'s avatar`} />
            <h1>{sessionUser.firstName}'s personal info:</h1>
        <div className="info-box">
            <p>First Name:</p>
            <h1>{sessionUser.firstName}</h1>
        </div>
        <div className="info-box">
            <p>Last Name:</p>
            <h1>{sessionUser.lastName}</h1>
        </div>
        <div className="info-box">
            <p>Email Address:</p>
            <h1>{sessionUser.email}</h1>
        </div>
        <div className="info-box">
            <p>Home Town:</p>
            <h1>{sessionUser.homeCity}, {sessionUser.homeState}</h1>
        </div>
        </div>
        </>
    )
}