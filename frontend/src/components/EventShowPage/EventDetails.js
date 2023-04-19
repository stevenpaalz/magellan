import EventAttendees from "./EventAttendees";

const EventDetails = ({ event, startTime }) => {
    return (
        <>
        <div className="event-details-header-holder">
            <div className="event-details-header">Your Quest</div>
            {/* <div className="host-avatar-holder">
                <img src="https://magellan-seeds.s3.amazonaws.com/mag_blue_small.png" className="host-avatar"></img> 
            </div> */}
        </div>
        
        <div className="quest-show-text"><span className="show-label">Host:</span> { event.host.firstName + " " + event.host.lastName }</div>
        <div className="quest-show-text"><span className="show-label">Start Time:</span> {startTime}</div>
      {event.attendees.length > 0 ? (
        <div className="event-details-attendees-holder">
          <EventAttendees event={event} />
        </div>
      ) : null}
    </>
  );
};

export default EventDetails;