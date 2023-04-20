import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import '../QuestIndex/QuestIndex.css'
import { Link } from "react-router-dom";
import { getAllReviews } from "../../store/reviews";
import EventCard from "./EventCard";


export default function EventsIndex({events}){
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getAllReviews())
    },[])
    const reviews = useSelector(state=>state.reviews)
    return(
        <div className="card-column">
            {events.map((event, i)=>
            <Link key={i} to={`/events/${event._id}`}>
                <EventCard i={i} event={event} reviews={Object.values(reviews).filter((review)=>review.quest === event.quest._id)}/>
            </Link>)}
        </div>
    )
}