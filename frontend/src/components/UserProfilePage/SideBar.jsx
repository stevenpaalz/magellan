import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SideBar(){
   const {wildcard} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    return(
        <div className="left-side-bar">
        <div className="side-bar-links">
            <Link className={(wildcard==="userInfo"||wildcard===undefined)?"active":""} to='/user-profile/userInfo'><p>Your Info</p></Link>
            <Link className={(wildcard==="openEvents")?"active":""} to='/user-profile/openEvents'><p>Your Open Events</p></Link>
            <Link className={(wildcard==="upcomingEvents")?"active":""} to='/user-profile/upcomingEvents'><p>Your Upcoming Events</p></Link>
            <Link className={(wildcard==="yourQuests")?"active":""}to='/user-profile/yourQuests'><p>Your Designed Quests</p></Link>
        </div>
        </div>
    )
}