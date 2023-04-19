import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import StarRating from "../QuestIndex/StarRating";

const QuestShowReviews = ({ id }) => {
  const dispatch = useDispatch();

  const reviews = useSelector(state => {
    return state.reviews ? state.reviews : null;
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const filteredReviews = Object.values(reviews).filter((review) => {
    return review.quest === id;
  });

  if (!filteredReviews) return null;

  return (
    <>
    <div className="quest-show-reviews">
      {filteredReviews.map((review) => (
        <div className="quest-show-review" key={review.text}>

          <StarRating questReviews={[review]} />
          <div className="quest-show-review-text">"{review.text}"</div>
        </div>
      ))}
    </div>
    </>
  );
};

export default QuestShowReviews;
