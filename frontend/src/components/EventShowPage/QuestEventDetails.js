import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";
import { getAllReviews } from "../../store/reviews";
import StarRating from "../QuestIndex/StarRating";

const QuestEventDetails = ( {quest} ) => {
  const dispatch = useDispatch();
  const [hours, setHours] = useState("hour")
  const [miles, setMiles] = useState("mile")

  const reviews = useSelector(state => {
    return state.reviews ? state.reviews : null;
  });

  useEffect(() => {
    dispatch(getAllReviews());
    if (quest.duration > 1) {
      setHours("hours")
    }
    else {
      setHours("hour")
    }
    if (quest.radius > 1) {
      setMiles("miles")
    }
    else {
      setMiles("mile")
    }
  }, [dispatch]);

  const filteredReviews = Object.values(reviews).filter((review) => {
    return review.quest === quest._id;
  });




  if (!filteredReviews) return null;

  return (
    <>
        <div>
            <div className="quest-show-text"><span className="show-label">What to expect:</span> {quest.description}</div>
            <div className="quest-show-text"><span className="show-label">Radius:</span> {quest.radius} {miles}</div>
            <div className="quest-show-text"><span className="show-label">Duration:</span> {quest.duration} {hours}</div>
                        
            <div className="quest-show-text star-rating"><span className="show-rating-label">Rating:</span> 
                <StarRating questReviews={filteredReviews} />
            </div>
        </div>
    </>
  );
};

export default QuestEventDetails;