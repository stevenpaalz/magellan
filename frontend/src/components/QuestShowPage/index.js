import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";
import QuestShowTags from "./QuestShowTags";
import QuestShowReviews from "./QuestShowReviews";
import QuestMap from "../Map";
import QuestDetails from "./QuestDetails";

const QuestShowPage = () => {
const { id } = useParams();
  const dispatch = useDispatch();

  const quest = useSelector(state => {
    return state.quests ? state.quests[id] : null
  });

  useEffect(() => {
    dispatch(getQuest(id));
  }, [dispatch, id]);

  if (!quest) return null;

  return (
    <>
        <div className="quest-show-full-page">
            <div className="quest-show-holder">
                <div className="quest-show-hero" style={{ backgroundImage: `url(${quest.imageUrls[0]})`} }>
                    <div className="quest-show-title">{quest.title}</div>
                    <QuestShowTags tags={quest.tags} />

                </div>

                <div className="quest-show-full-bottom">
                    <div className="quest-show-left">
                        <div className="quest-show-map-holder">
                            <QuestMap style={{ height: '100%', width: '100%' }} lat={quest.lat} lng={quest.lng} quests={[quest]} />
                        </div>
                        
                        <div className="quest-show-reviews-holder">
                            <div className="quest-show-reviews-header">Reviews</div>
                            <QuestShowReviews id={id} />
                        </div>
                    </div>
                    
                    <div className="quest-show-right">
                        <div className="quest-show-body-holder">
                            <QuestDetails quest={quest} />
                        </div>


                        <div className="quest-show-buttons-holder">
                            <button className="quest-show-start-quest">Start Quest</button>
                            <button className="quest-show-schedule-quest">Schedule for Later</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default QuestShowPage;