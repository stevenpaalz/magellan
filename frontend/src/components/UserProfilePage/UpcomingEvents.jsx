import { useSelector } from "react-redux"

export default function UpcomingEvents(){
    const sessionUser = useSelector(state => state.session.user);
    return(
        <h1>{sessionUser.firstName}'s upcoming events:</h1>
    )
}