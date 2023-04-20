import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import StarRating from "../QuestIndex/StarRating";
import "./QuestShowReviewForm.css";
import { createReview } from "../../store/reviews";

const QuestShowReviews = ({ id }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("")
  const [text, setText] = useState("")
  const reviewErrors = useSelector(state => state.errors.review);

  const reviews = useSelector(state => {
    return state.reviews ? state.reviews : null;
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const filteredReviews = Object.values(reviews).filter((review) => {
    return review.quest === id;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let review = {
      rating: parseInt(rating),
      text: text
    }
    dispatch(createReview(id, review));
    if (!reviewErrors) {
      setText("");
      setRating("");
    }
  }

  if (!filteredReviews) return null;

  return (
    <>
    <div className="quest-show-reviews-header">Reviews</div>
    <div className="quest-show-reviews">
      {filteredReviews.map((review) => (
        <div className="quest-show-review" key={review.text}>

          <StarRating questReviews={[review]} />
          <div className="quest-show-review-text">"{review.text}"</div>
        </div>
      ))}
      <div className="create-new-review">
        <h4>Add a review</h4>
        <form onSubmit={handleSubmit} className="create-new-review-form">
          <div className="rating-input-holder">
            <label>Rating:</label>
            <br></br>
            <input id="rating-input" name="rating-input" type="number" min="0" max="5" value={rating} onChange={(e) => {setRating(e.target.value)}}/>
            {reviewErrors && <p className="formError">{reviewErrors.text}</p>}
          </div>
          <div className="review-input-holder">
            <label>Review:</label>
            <br></br>
            <textarea id="review-text-area" placeholder="Enter your review" value={text} onChange={(e) => {setText(e.target.value)}}/>
            {reviewErrors && <p className="formError">{reviewErrors.rating}</p>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default QuestShowReviews;
