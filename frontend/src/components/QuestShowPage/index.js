import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";

const QuestShowPage = () => {
const { id } = useParams();
  const dispatch = useDispatch();
//   const quest = useSelector(state => state.);
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
                    <div className="quest-show-checkpoint-holder">Checkpoint Holder
                        <div className="quest-show-checkpoint">Checkpoint 1: Placeholder Placeholder</div>
                        <div className="quest-show-checkpoint">Checkpoint 1: Placeholder Placeholder</div>
                        <div className="quest-show-checkpoint">Checkpoint 1: Placeholder Placeholder</div>
                        <div className="quest-show-checkpoint">Checkpoint 1: Placeholder Placeholder</div>
                        <div className="quest-show-checkpoint">Checkpoint 1: Placeholder Placeholder</div>
                    </div>
                    {/* <div className="quest-show-map">Map?</div> */}
                </div>
                <div className="quest-show-right">
                    <div className="quest-show-header-holder">
                        <div className="quest-show-title">Title</div>
                        <div className="quest-show-tags">Tags</div>
                        <div className="quest-show-image">Image?</div>
                    </div>
                    <div className="quest-show-body-holder">
                        <div className="quest-show-description">Description</div>
                        <div className="quest-show-radius">Radius</div>
                        <div className="quest-show-time-needed">Duration</div>
                        <div className="quest-show-reviews">Reviews</div>
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