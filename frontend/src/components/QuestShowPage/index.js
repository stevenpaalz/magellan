import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuest, getQuest } from "../../store/quests";
import QuestShowTags from "./QuestShowTags";
import QuestShowReviews from "./QuestShowReviews";
import QuestMap from "../Map";
import QuestDetails from "./QuestDetails";
import { setModal } from "../../store/modal";
import EventForm from "../Modals/EventForm";
import { createEvent } from "../../store/events";
import { useHistory } from "react-router-dom";
import UpdateForm from "../Modals/UpdateForm";

const QuestShowPage = () => {
    const history = useHistory();
    const modalState = useSelector(state => state.modals?.modalState);
    const sessionUser = useSelector(state => state.session.user)

    const { id } = useParams();
    const dispatch = useDispatch();
  const quest = useSelector(state => {
    return state.quests ? state.quests[id] : null
  });
  
  useEffect(() => {
    dispatch(getQuest(id));
  }, [dispatch, id]);
  
  if (!quest) return null;
  
  let editButton;
  if (sessionUser && sessionUser._id === quest?.creator._id) {
      editButton = <button onClick={updateClick} className="show-page-button show-page-button-blue-button">Update</button>
  }
  let deleteButton;
  if (sessionUser && sessionUser._id === quest?.creator._id) {
      deleteButton = <button onClick={deleteClick} className="show-page-button show-page-button-red-button">Delete</button>
  }

  const startEvent = async (e) => {
    e.preventDefault();
    let event = {
        host: sessionUser._id,
        quest: quest._id,
        attendees: [],
        startTime: (new Date()).toISOString()
    }
    const id = await dispatch(createEvent(event));
    history.replace(`/events/${id}`);
  }

  const openModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setModal("createEvent"))
  }

  function updateClick(e){
    e.preventDefault();
    dispatch(setModal("updateForm"))
  }

  async function deleteClick(e){
    e.preventDefault(); 
    const questId = await dispatch(deleteQuest(id))
    if (questId) {
      history.replace(`/quests`)
    };
  }



  return (
    <>
        <div className="quest-show-full-page">
            <div>
                <div className="quest-show-hero" style={{ backgroundImage: `url(${quest.imageUrls[0]})`} }>
                      <NavLink exact to="/quests">
                          <div className="back-holder">
                              <div className="back-text">
                                <i className="fa-solid fa-arrow-left"></i>
                              </div>
                          </div>
                      </NavLink> 

                    <div className="quest-show-title">{quest.title}</div>
                    <QuestShowTags tags={quest.tags} />

                </div>
                <UpdateForm />
                <div className="quest-show-full-bottom">
                    <div className="quest-show-left">
                        <div className="quest-show-map-holder">
                            <QuestMap style={{ height: '100%', width: '100%' }} lat={quest.lat} lng={quest.lng} quests={[quest]} />
                        </div>
                        
                        <div className="quest-show-reviews-holder">
                            <QuestShowReviews id={id} />
                        </div>
                    </div>
                    
                    <div className="quest-show-right">
                        <div className="quest-show-body-holder">
                            <QuestDetails quest={quest} />
                        </div>


                        <div className="quest-show-buttons-holder">
                          <div className="quest-show-creator-bar">
                              <div className="quest-show-bar-left">
                                <button onClick={startEvent} className="show-page-button show-page-button-orange-button">Start Now</button>
                                <button onClick={openModal} className="show-page-button">Schedule for Later</button>
                              </div>
                              <div className="quest-show-bar-right">
                                {editButton}
                                {deleteButton}
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <EventForm quest={quest} host={sessionUser} />
        </div>
    </>
  );
};

export default QuestShowPage;