import { useSelector } from "react-redux"
import EventsIndex from "./EventsIndex";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllEvents } from "../../store/events";

export default function UpcomingEvents(){
    const sessionUser = useSelector(state => state.session.user);
    const [filter, setFilter] = useState("host")
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllEvents())
    },[dispatch])
    function handleClick(e){
        if (e.target.classList.contains("host-button")){
            setFilter("host")
        }else{
            setFilter("attend")
        }
    }
    useEffect(()=>{
        events = filter === "host" ? pastEvents.filter(event=> event.host._id === sessionUser._id) : pastEvents.filter(event=> Object.values(event.attendees).some(attendee => attendee._id === sessionUser._id) )
    },[filter])
    const allEvents = useSelector(state=> state.events)
    if (!allEvents){return null} 
    let pastEvents = Object.values(allEvents).filter((event)=> Date.parse(event.startTime) > Date.now())
    let events = filter === "host" ? pastEvents.filter(event=> event.host._id === sessionUser._id) : pastEvents.filter(event=> Object.values(event.attendees).some(attendee => attendee._id === sessionUser._id) )
    return(
        <>
            <h1>{sessionUser.firstName}'s upcoming events:</h1>
            <div className="host-attend-buttons">
            <button className="host-button"onClick={handleClick}>You're Hosting</button>
            <button className="attend-button" onClick={handleClick}>You're Attending</button>
            </div>
            {(!events || events.length === 0)&& <div className="card-column"><div className="quest-card"><h1>{sessionUser.firstName} has no upcoming events</h1></div></div>}
            {(events && events.length!== 0) && <EventsIndex events={events.sort(event=>Date.parse(event.startTime))} />}
        </>
    )
}