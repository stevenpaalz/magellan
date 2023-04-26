import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SideBar(){
   const {wildcard} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    return(
        <div className="left-side-bar">
        <div className="side-bar-links">
            <Link className={(wildcard==="userInfo"||wildcard===undefined)?"active":""} to='/user-profile/userInfo'><p>Personal Info</p></Link>
            <Link className={(wildcard==="pastEvents")?"active":""} to='/user-profile/pastEvents'><p>Past Events</p></Link>
            <Link className={(wildcard==="currentEvents")?"active":""} to='/user-profile/currentEvents'><p>Current Events</p></Link>
            <Link className={(wildcard==="upcomingEvents")?"active":""} to='/user-profile/upcomingEvents'><p>Upcoming Events</p></Link>
            <Link className={(wildcard==="yourQuests")?"active":""}to='/user-profile/yourQuests'><p>Designed Quests</p></Link>
        </div>
        </div>
    )
}