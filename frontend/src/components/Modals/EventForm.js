import { setModal } from "../../store/modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createEvent } from "../../store/events";
import { useHistory } from "react-router-dom";
import { getAllUsers } from "../../store/users";

function EventForm({quest, host}) {
    const history = useHistory();
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const [date, setDate] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [guest, setGuest] = useState("");
    const users = useSelector(state => state.users);
    const [invalidUser, setInvalidUser] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);

    useEffect(()=>{
        dispatch(getAllUsers())
    }, [dispatch, modalState])

    useEffect(() => {
        if (modalState !== "createEvent") return;
        const closeModals = (e) => {
            let modalContent = document.getElementById("modal-content");
            if (e.target.classList.contains("modal-content") || modalContent.contains(e.target) || e.target.nodeName !== "DIV") return;
            dispatch(setModal(false));
        };
        document.addEventListener('click', closeModals);
        return () => document.removeEventListener("click", closeModals);
    }, [modalState, dispatch]);

    const addGuest = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (guest) {
            setInvalidUser(false);
            if (Object.values(users).some((user) => user.email === guest)) {
                attendees.push(guest);
                setAttendees(attendees);
                setGuest("");
            }
            else {
                setInvalidUser(true);
            }
        }
    }

    const removeAttendee = (e) => {
        e.stopPropagation();
        let newAttendees = attendees.splice(attendees.indexOf(e.target.id), 1);
        setAttendees(newAttendees);
        document.getElementById(`${e.target.id}-li`).remove();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInvalidDate(false);
        if (!date.$d) {
            setInvalidDate(true);
            return;
        }
        let formattedDate = date.$d.toISOString();
        let event = {
            host: host._id,
            quest: quest._id,
            startTime: formattedDate,
            attendees: attendees
        }
        const id = await dispatch(createEvent(event));
        history.replace(`/events/${id}`);
    }

    if (modalState && modalState === "createEvent") {
        return(
            <div id='page-overlay' className="page-overlay">
                <div className="modal-content" id="modal-content">
                    <form onSubmit={handleSubmit}>
                        <h1>Schedule your event for {quest.title} quest</h1>
                        <div className="attendees">
                            <h3>Host: {host.firstName} {host.lastName}</h3>
                            <div>
                                <p>Add guests:</p>
                                <input type="text" placeholder="Email" value={guest} onChange={(e)=>{setGuest(e.target.value)}}/>
                                <button onClick={addGuest}>Add Guest</button>
                                {invalidUser && <p>Not a valid user</p>}
                            </div>

                            <h3>Your Party:</h3>
                            <ul>
                                {attendees.map((attendee)=> (<li id={attendee + "-li"} key={attendee}>{attendee} <i onClick={removeAttendee} id={attendee} className="fa-solid fa-x"></i></li>))}
                            </ul>
                        </div>
                        <div className="calendar">
                            <h3>Please select a date for your event</h3>
        
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker 
                                    views={['year', 'day', 'hours', 'minutes']} 
                                    disablePast
                                    value={date}
                                    onChange={setDate}
                                />
                            </LocalizationProvider>
                            {invalidDate && <p>Please enter a valid date</p>}
                        </div>
                        <div className="modal-content-button">
                            <button type="submit">Schedule</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    } else {
        return null;
    }
}

export default EventForm;