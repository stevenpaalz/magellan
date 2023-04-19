import React, { useEffect } from "react";
import "./QuestShowPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuest } from "../../store/quests";
import { getAllReviews } from "../../store/reviews";
import StarRating from "../QuestIndex/StarRating";

const QuestDetails = ( {quest} ) => {
  const dispatch = useDispatch();

  const reviews = useSelector(state => {
    return state.reviews ? state.reviews : null;
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const filteredReviews = Object.values(reviews).filter((review) => {
    return review.quest === quest._id;
  });

  if (!filteredReviews) return null;

  return (
    <>
        <div>
            <div className="quest-show-description"><span className="show-label">What to expect:</span> {quest.description}</div>
            <div className="quest-show-text"><span className="show-label">Radius:</span> {quest.radius}  miles</div>
            <div className="quest-show-text"><span className="show-label">Duration:</span> {quest.duration} hours</div>
                        
            <div className="quest-show-text star-rating"><span className="show-rating-label">Rating:</span> 
                <StarRating questReviews={filteredReviews} />
            </div>
        </div>
    </>
  );
};

export default QuestDetails;