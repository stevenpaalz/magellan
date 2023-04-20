import { useSelector } from "react-redux"
import EventsIndex from "./EventsIndex";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllUserEvents } from "../../store/events";

export default function PastEvents(){
    const sessionUser = useSelector(state => state.session.user);
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUserEvents(sessionUser._id))
    },[dispatch])
    function handleClick(e){
        if (e.target.classList.contains("host-button")){
            setFilter("host")
        }else{
            setFilter("attend")
        }
    }
    const allEvents = useSelector(state=> state.events)
    const pastEvents = Object.values(allEvents).filter((event)=> Date.parse(event.startTime) < Date.now)
    const events = filter === "host" ? pastEvents.filter(event=> event.host._id === sessionUser._id) : pastEvents.filter(event=> Object.values(event.attendees).any(attendee => attendee._id === sessionUser._id) )
    return(
        <>
            <h1>{sessionUser.firstName}'s past events:</h1>
            <div className="host-attend-buttons">
            <button className="host-button"onClick={handleClick}>You Hosted</button>
            <button className="attend-button" onClick={handleClick}>You Attended</button>
            </div>
            {(!events || events === [])&& <div className="quest-card"><h1>{sessionUser.firstName} has no past events</h1></div>}
            <EventsIndex events={events} />
        </>
    )
}