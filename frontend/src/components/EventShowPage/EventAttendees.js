const EventAttendees = ({event}) => {
    return (
      <div className="attendees-holder">
        <div className="quest-show-text">
          <span className="show-label">Your Party:</span>
        </div>
        <div className="attendees-list">
          {event.attendees.map((attendee) => (
            <div className="attendee-holder" key={attendee._id}>
              <div className="attende-details">
                <div className="attendee-avatar-holder">
                  <div className="avatar-circle">{attendee.firstName[0]}{attendee.lastName[0]}</div>
                  <div className="attendee-name">{attendee.firstName} {attendee.lastName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default EventAttendees;
  