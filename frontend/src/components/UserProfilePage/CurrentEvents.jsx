import { useSelector } from "react-redux"
import EventsIndex from "./EventsIndex";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllEvents } from "../../store/events";

export default function CurrentEvents(){
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
    const allEvents = useSelector(state=> state.events)
    useEffect(()=>{
        events = filter === "host" ? currentEvents.filter(event=> event.host._id === sessionUser._id) : currentEvents.filter(event=> Object.values(event.attendees).some(attendee => attendee._id === sessionUser._id) )
    }, [filter])
    if (!allEvents){
        return null} 
    let currentEvents = Object.values(allEvents).filter((event)=> (((Date.parse(event.startTime)+(event.quest.duration*3600000)) > Date.now()) && (Date.parse(event.startTime) < Date.now())))
    let events = filter === "host" ? currentEvents.filter(event=> event.host._id === sessionUser._id) : currentEvents.filter(event=> Object.values(event.attendees).some(attendee => attendee._id === sessionUser._id) )
    return(
        <>
            <h1>{sessionUser.firstName}'s open events:</h1>
            <div className="host-attend-buttons">
            <button className="host-button"onClick={handleClick}>Hosting</button>
            <button className="attend-button" onClick={handleClick}>Attending</button>
            </div>
            {(!events || events.length === 0)&& <div className="card-column"><div className="quest-card"><h1>{sessionUser.firstName} has no current events</h1></div></div>}
            {(events && events!== []) &&<EventsIndex events={events} />}
        </>
    )
}