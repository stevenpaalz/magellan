import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";
import QuestShowTags from "./QuestShowTags";

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
                <div className="quest-show-left">
                    <div className="quest-show-map-holder">
                        <div className="quest-show-map"></div>
                    </div>
                </div>
                <div className="quest-show-right">
                    <div className="quest-show-header-holder">
                            <div className="quest-show-title">{quest.title}</div>
                            <img src={quest.imageUrls[0]} className="quest-show-image"/>                    </div>

                    <div className="quest-show-tags-holder">
                        <QuestShowTags tags={quest.tags} />
                    </div>

                    <div className="quest-show-body-holder">
                        <div className="quest-show-description">{quest.description}</div>
                        <div className="quest-show-radius">Radius: {quest.radius} miles</div>
                        <div className="quest-show-time-needed">Duration: {quest.duration} hours</div>
                        <div className="quest-show-reviews">Reviews Placeholder</div>
                    </div>
                    <div className="quest-show-buttons-holder">
                        <button className="quest-show-start-quest">Start Quest</button>
                        <button className="quest-show-schedule-quest">Schedule for Later</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default QuestShowPage;