
import { useSelector } from "react-redux"

export default function UserInfo(){

    const sessionUser = useSelector(state => state.session.user);

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