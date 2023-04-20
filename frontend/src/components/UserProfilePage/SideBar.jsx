import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

export default function SideBar(){
    const sessionUser = useSelector(state => state.session.user);
    return(
        <div className="left-side-bar">
            
        
        <div className="side-bar-links">
            <Link to='/user-profile/userInfo'><p>Your Info</p></Link>
            <Link to='/user-profile/yourQuests'><p>Your Quests</p></Link>
            <Link to='/user-profile/pastEvents'><p>Your Past Events</p></Link>
            <Link to='/user-profile/upcomingEvents'><p>Your Upcoming Events</p></Link>
        </div>
        </div>
    )
}