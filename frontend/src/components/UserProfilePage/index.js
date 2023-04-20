import { useParams } from "react-router-dom";
import "./UserProfilePage.css";
import SideBar from "./SideBar";
import UserInfo from "./UserInfo";
import PastEvents from "./PastEvents";
import YourQuests from "./YourQuests";
import UpcomingEvents from "./UpcomingEvents";

function UserProfilePage(){
    // const sessionUser = useSelector(state => state.session.user);
    const {wildcard} = useParams()
            return(
                <div className="profile-bg">
                <SideBar />
                <div className="profile-right">
                {(wildcard==="userInfo" || wildcard===undefined) &&<UserInfo />}
                {(wildcard==="yourQuests")&&<YourQuests />}
                {(wildcard==="openEvents")&&<PastEvents />}
                {(wildcard==="upcomingEvents")&&<UpcomingEvents />}
                </div>
                </div>
            )
    }
    // return(
        
    //     <div className="user-profile-page">
    //         <div className="user-profile-page-header">
    //             <h2>Hello, {sessionUser.firstName}</h2>
    //         </div>
    //         <div className="upcoming-events">
    //             <h3>Your Upcoming Events</h3>
    //             <div className="upcoming-events-container">

    //             </div>
    //         </div>
    //         <div className="created-quests">
    //             <h3>Your Created Quests</h3>
    //             <div className="created-quests-container">

    //             </div>
    //         </div>
    //     </div>
    // )


export default UserProfilePage;