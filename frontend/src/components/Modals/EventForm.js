import { setModal } from "../../store/modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function EventForm({quest, host}) {
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 
    const [date, setDate] = useState(null);
    const [attendees, setAttendees] = useState([]);
    const [guest, setGuest] = useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        let formattedDate = date.$d.toISOString
        let attendees = [];
        if (guest) {attendees.push(guest)};

    }

    if (modalState && modalState === "createEvent") {
        return(
            <div id='page-overlay' className="page-overlay">
                <div className="modal-content" id="modal-content">
                    <form onSubmit={handleSubmit}>
                        <h1>Schedule your event for {quest.title} quest</h1>
                        <div className="attendees">
                            <h3>Host: {host.firstName} {host.lastName}</h3>
                            <h3>Guests:</h3>
                            <input type="text" placeholder="Email" value={guest} onChange={(e)=>{setGuest(e.target.value)}}/>
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