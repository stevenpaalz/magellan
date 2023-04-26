import { useParams } from "react-router-dom";
import "./UserProfilePage.css";
import SideBar from "./SideBar";
import UserInfo from "./UserInfo";
import PastEvents from "./PastEvents";
import YourQuests from "./YourQuests";
import UpcomingEvents from "./UpcomingEvents";
import CurrentEvents from "./CurrentEvents";

function UserProfilePage(){
    // const sessionUser = useSelector(state => state.session.user);
    const {wildcard} = useParams()
            return(
                <div className="profile-bg">
                <SideBar />
                <div className="profile-right">
                {(wildcard==="userInfo" || wildcard===undefined) &&<UserInfo />}
                {(wildcard==="pastEvents")&&<PastEvents />}
                {(wildcard==="upcomingEvents")&&<UpcomingEvents />}
                {(wildcard==="yourQuests")&&<YourQuests />}
                {(wildcard==="currentEvents")&&<CurrentEvents />}
                </div>
                </div>
            )
    }

export default UserProfilePage;