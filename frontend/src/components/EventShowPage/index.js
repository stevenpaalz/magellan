import "./EventShowPage.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvent } from "../../store/events";
import QuestMap from "../Map";
import QuestDetails from "../QuestShowPage/QuestDetails";
import QuestShowTags from "../QuestShowPage/QuestShowTags";
import EventDetails from "./EventDetails";


const EventShowPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events[id]);

    useEffect(() => {
        dispatch(getEvent(id));
    }, [dispatch, id]);

    if (!event) return(
        <h1>Loading...</h1>
    );
    
    const startTime = new Date(event.startTime);
    const formattedStartTime = startTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    const currentTime = new Date();
    const formattedCurrentTime = currentTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    return(
        <>
            <div className="quest-show-full-page">
            <div className="quest-show-holder">
                <div className="quest-show-hero" style={{ backgroundImage: `url(${event.quest.imageUrls[0]})`} }>
                    <div className="quest-show-title">{event.quest.title}</div>
                    <QuestShowTags tags={event.quest.tags} />
                </div>

                <div className="quest-show-full-bottom">
                    <div className="quest-show-left">
                        <div className="quest-show-map-holder">
                            <QuestMap style={{ height: '100%', width: '100%' }} lat={event.quest.lat} lng={event.quest.lng} quest={event.quest} />
                        </div>
                        
                        <div className="quest-show-reviews-holder">
                            <QuestDetails quest={event.quest} />
                        </div>
                    </div>
                
                    <div className="quest-show-right">
                        <div className="quest-show-body-holder">
                            <div className="event-show-details-holder">
                                <EventDetails event={event} startTime={formattedStartTime} />
                            </div>

                            <div className="event-show-checkpoints-holder">Checkpoints
                                {currentTime >= startTime ?
                                    <div className="checkpoints-revealed">Checkpoint Revealed</div>
                                    :
                                    <div className="checkpoints-hidden">Checkpoint Hidden</div>
                                }
                            </div>

                            
                        </div>

                        <div className="quest-show-buttons-holder">
                            <button className="quest-show-start-quest">Edit Event</button>
                            <button className="quest-show-schedule-quest">Delete Event</button>
                        </div>
                    </div>
                    </div>
                </div>
            
        </div>
        </>

    )
}

export default EventShowPage





