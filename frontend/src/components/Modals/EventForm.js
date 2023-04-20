import { setModal } from "../../store/modal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { createEvent, getEvent, updateEvent } from "../../store/events";
import { useHistory } from "react-router-dom";
import { getAllUsers } from "../../store/users";
import { useParams } from "react-router-dom";

function EventForm({quest, host}) {
    const { id } = useParams();
    const history = useHistory();
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const [date, setDate] = useState(null);
    const [attendees, setAttendees] = useState({});
    const [guest, setGuest] = useState("");
    const users = useSelector(state => state.users);
    const [invalidUser, setInvalidUser] = useState(false);
    const [invalidDate, setInvalidDate] = useState(false);

    useEffect(()=>{
        dispatch(getAllUsers())
    }, [dispatch, modalState])

    useEffect(()=>{
        const fillAttendees = async () => {
            const event = await dispatch(getEvent(id));
            let newAttendees = {};
            event.attendees.forEach((attendee) => {
                newAttendees[attendee.email] = attendee.email;
            })
            setAttendees(newAttendees)
        }

        if (id) {
            fillAttendees();
        }
    }, [])

    useEffect(() => {
        if (modalState !== "createEvent") return;
        const closeModals = (e) => {
            let modalContent = document.getElementById("modal-content");
            if (modalContent.contains(e.target) || e.target === modalContent|| e.target.nodeName !== "DIV") return;
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
            if (attendees[guest]) {
                setInvalidUser(true)
                return;
            }
            if (Object.values(users).some((user) => user.email === guest)) {
                attendees[guest] = guest;
                setAttendees(attendees);
                setGuest("");
            }
            else {
                setInvalidUser(true);
            }
        }
    }

    const closeModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(setModal(false));
    }

    const removeAttendee = async (e) => {
        let newAttendees = {...attendees}
        await delete newAttendees[e.target.id];
        await setAttendees(newAttendees);
        return;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInvalidDate(false);
        if (!date) {
            setInvalidDate(true);
            return;
        }
        let formattedDate = date.$d.toISOString();
        let event = {
            host: host._id,
            quest: quest._id,
            startTime: formattedDate,
            attendees: Object.values(attendees)
        }
        if (!id) {
            const id = await dispatch(createEvent(event));
            history.replace(`/events/${id}`);
        } else {
            event["_id"] = id;
            dispatch(updateEvent(event));
            dispatch(setModal(false));
        }
    }

    if (modalState && modalState === "createEvent") {
        return(
            <div id='page-overlay' className="page-overlay">
                <div className="modal-content" id="modal-content">
                    <form onSubmit={handleSubmit}>
                        <h1>Schedule your event!</h1>
                        <h3><span>Host: </span>{host.firstName} {host.lastName}</h3>
                        <div className="attendees">
                            <div>
                                <h3><span>Your Party:</span></h3>

                                <input id="add-guest-input" type="text" placeholder="Email" value={guest} onChange={(e)=>{setGuest(e.target.value)}}/>
                                <button id="add-guest-button" onClick={addGuest}>Add Guest</button>
                                {invalidUser && <p className="error">Not a valid user</p>}
                            </div>

                            <ul className="attendees-list-create">
                                {
                                    Object.values(attendees).map((attendee) => {
                                        return(<li id={attendee + "-li"} key={attendee}>{attendee} <i onClick={removeAttendee} id={attendee} className="fa-solid fa-x"></i></li>)
                                    })
                                }
                            </ul>
                        </div>
                        <div onClick={()=>setInvalidDate(false)} className="calendar">
                            <h3><span>Date & Time:</span></h3>
        
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker 
                                    views={['year', 'day', 'hours', 'minutes']} 
                                    disablePast
                                    value={date}
                                    onChange={setDate}
                                />
                            </LocalizationProvider>
                            {invalidDate && <p className="error">Please enter a valid date</p>}
                        </div>
                        <div className="modal-content-button">
                            {!id && <button type="submit">Schedule</button>}
                            {id && <button type="submit">Update</button>}
                        </div>
                    </form>
                    <div onClick={closeModal} className="upper-x">
                        <i className="fa-solid fa-x"></i>
                    </div>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default EventForm;