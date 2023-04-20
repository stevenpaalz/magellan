import StarRating from "../QuestIndex/StarRating"
import '../QuestIndex/QuestIndex.css'
import QuestShowTags from "../QuestShowPage/QuestShowTags"

export default function EventCard({i, event, reviews}){

    const date = event?.startTime?.split("T")[0].split("-")
    const time = event?.startTime?.split("T")[1].split(".")[0].split(":")
    const formattedStart = `${date[1]}/${date[2]}/${date[0]} at ${time[0]}:${time[1]} o'clock`
    const startTime = new Date(event.startTime);
    return(
        <div className="quest-card" key={i}>
            <img className="quest-start-image" src={event.quest.imageUrls? event.quest.imageUrls[0] : ""} alt=""/>
            <div className="quest-info">
                <h1 className="quest-title">{i+1}. {event.quest.title}</h1>
                <label><p>rating:</p>
                <StarRating questId={event.quest._id} questReviews={reviews}/>
                </label>
                <label><p>tags:</p>
                <QuestShowTags tags={event.quest.tags} />
                </label>
                <label><p>event starts:</p>
                <h1>{startTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</h1>
                </label>
                <label><p>hosted by:</p>
                <h1>{event.host.firstName} {event.host.lastName}</h1>
                </label>
                <label><p>invited:</p>
                {event.attendees.map((attendee)=><h1>{attendee.firstName} {attendee.lastName}</h1>)}
                </label>
            </div>
        </div>
    )
}