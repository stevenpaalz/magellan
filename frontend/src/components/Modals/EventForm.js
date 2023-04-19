import { setModal } from "../../store/modal";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import "./EventForm.css";

function EventForm() {
    const modalState = useSelector(state => state.modals?.modalState);
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (modalState !== "createEvent") return;
        const closeModals = (e) => {
            if (e.target.classList.contains("modal-content")) return;
            dispatch(setModal(false));
        };
        document.addEventListener('click', closeModals);
        return () => document.removeEventListener("click", closeModals);
      }, [modalState, dispatch]);

    if (modalState && modalState === "createEvent") {
        return(
            <div className="page-overlay">
                <div className="modal-content">
                    <h1>Hello from modal</h1>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default EventForm;