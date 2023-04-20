import "./EventShowPage.css";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvent, deleteEvent } from "../../store/events";
import QuestMap from "../Map";
import QuestDetails from "../QuestShowPage/QuestDetails";
import QuestShowTags from "../QuestShowPage/QuestShowTags";
import EventDetails from "./EventDetails";
import HiddenCheckpoints from "./HiddenCheckpoints";
import RevealedCheckpoints from "./RevealedCheckpoints";
import { setModal } from "../../store/modal";
import EventForm from "../Modals/EventForm";
import QuestEventDetails from "./QuestEventDetails";

const EventShowPage = () => {
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const { id } = useParams();
    const dispatch = useDispatch();
    const event = useSelector(state => state.events[id]);

    const deleteThisEvent = (e) => {
        e.preventDefault();
        dispatch(deleteEvent(id));
        history.replace("/quests");
    }

    useEffect(() => {
        dispatch(getEvent(id));
    }, [dispatch, id]);

    if (!event) return(
        <h1>Loading...</h1>
    );
    
    const openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setModal("createEvent"))
    }

    const startTime = new Date(event.startTime);
    const formattedStartTime = startTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    const currentTime = new Date();
    const formattedCurrentTime = currentTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    return(
        <>
            <div className="quest-show-full-page">
            <div>
                <div className="quest-show-hero" style={{ backgroundImage: `url(${event.quest.imageUrls[0]})`} }>
                    <div className="quest-show-title">{event.quest.title}</div>
                    <QuestShowTags tags={event.quest.tags} />
                </div>

                <div className="quest-show-full-bottom">
                    <div className="quest-show-left">
                        <div className="quest-show-map-holder">
                            <QuestMap style={{ height: '100%', width: '100%' }} lat={event.quest.lat} lng={event.quest.lng} quests={[event.quest]} />
                        </div>
                        
                        <div className="quest-show-reviews-holder">
                            <QuestEventDetails quest={event.quest} startTime={formattedStartTime} />
                        </div>

                        {currentTime < startTime && 
                        <div className="event-show-buttons-holder">
                            <button onClick={openModal} className="show-page-button show-page-button-blue-button">Edit Event</button>
                            <button onClick={deleteThisEvent} className="show-page-button show-page-button-red-button">Delete Event</button>
                        </div>
                        }



                    </div>
                
                    <div className="quest-show-right">
                        <div className="event-show-body-holder">
                            <div className="event-show-details-holder">
                                <EventDetails event={event} startTime={formattedStartTime} />
                            </div>

                            <div className="event-show-checkpoints-holder">
                                {currentTime >= startTime ?
                                    <RevealedCheckpoints checkpoints={event.quest.checkpoints} />
                                    :
                                    <HiddenCheckpoints checkpoints={event.quest.checkpoints} />
                                }
                            </div>
                        </div>
    

                    </div>
                    </div>
                </div>

        </div>
        <div>
            <EventForm quest={event.quest} host={sessionUser} />
        </div>
        </>

    )
}

export default EventShowPage


