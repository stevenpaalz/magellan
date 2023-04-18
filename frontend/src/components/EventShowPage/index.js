import "./EventShowPage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvent } from "../../store/events";

function EventShowPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events[id]);

    useEffect(() => {
        dispatch(getEvent(id));
    }, [dispatch, id]);

    if (!event) return null;

    return(
        <>
            <h1>hello from event show page {event._id}</h1>
            <img src={event.quest.imageUrls}></img>
        </>

    )
}

export default EventShowPage