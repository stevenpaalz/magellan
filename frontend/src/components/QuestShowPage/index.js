import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";
import { getAllReviews } from "../../store/reviews";
import QuestShowTags from "./QuestShowTags";
import QuestShowReviews from "./QuestShowReviews";

const QuestShowPage = () => {
const { id } = useParams();
  const dispatch = useDispatch();

  const quest = useSelector(state => {
    return state.quests ? state.quests[id] : null
  });

  const reviews = useSelector(state => {
    return state.reviews ? state.reviews : null
    });



  useEffect(() => {
    dispatch(getQuest(id));
  }, [dispatch, id]);

    useEffect(() => {
    dispatch(getAllReviews());
    }, [dispatch]);
    // console.log(reviews)

    const filteredReviews = Object.values(reviews).filter((review) => {
        return review.quest === id;
      });
      
      console.log(filteredReviews);

  if (!quest) return null;



  return (
    <>
        <div className="quest-show-full-page">
            <div className="quest-show-holder">
                <div className="quest-show-hero" style={{ backgroundImage: `url(${quest.imageUrls[0]})`} }>
                    <div className="quest-show-title">{quest.title}</div>
                </div>

                <div className="quest-show-full-bottom">
                    <div className="quest-show-left">
                        <div className="quest-show-map-holder">Map</div>
                        <div className="quest-show-reviews-holder">
                            {/* <QuestShowReviews id={id} /> */}
                        </div>
                    </div>
                    
                    <div className="quest-show-right">
                        <div className="quest-show-body-holder">
                            <div className="quest-show-description">{quest.description}</div>
                            <div className="quest-show-tags-holder">
                                <QuestShowTags tags={quest.tags} />
                            </div>
                            <div className="quest-show-text">Radius: {quest.radius} miles</div>
                            <div className="quest-show-text">Duration: {quest.duration} hours</div>
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