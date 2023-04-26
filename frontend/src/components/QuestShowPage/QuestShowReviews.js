import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviews } from "../../store/reviews";
import StarRating from "../QuestIndex/StarRating";
import "./QuestShowReviewForm.css";
import { createReview } from "../../store/reviews";
import { deleteReview } from "../../store/reviews";

const QuestShowReviews = ({ id, creatorId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState("")
  const [text, setText] = useState("")
  
  const reviewErrors = useSelector(state => state.errors.review);

  const reviews = useSelector(state => {
    return state.reviews ? state.reviews : null;
  });
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const filteredReviews = Object.values(reviews).filter((review) => {
    return review.quest === id;
  });
  const [showReviewForm, setShowReviewForm] = useState(!filteredReviews.some((review)=>{
    return review.author._id === sessionUser._id
  }))
  useEffect(()=>{
    setShowReviewForm(!filteredReviews.some((review)=>{
      return review.author._id === sessionUser._id
    }))
  }, [filteredReviews])

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
  function handleEditClick(text, rating, id){
    setRating(rating)
    setText(text)
    dispatch(deleteReview(id))
    setShowReviewForm(true)
  }
  function handleDeleteClick(id){
    dispatch(deleteReview(id))
    setShowReviewForm(true)
  }
 
  if (!filteredReviews) return null;
  return (
    <>
    <div className="quest-show-reviews-header">Reviews:</div>
    <div className="quest-show-reviews">
      {filteredReviews.map((review) => (
        <div className="quest-show-review" key={review.text}>
          {(review.author._id === sessionUser?._id) && <div className="quest-show-reviews-header">Your Review:</div>}
          <StarRating questReviews={[review]} />
          <div className="quest-show-review-text">"{review.text}"</div>
          {(review.author._id === sessionUser?._id) && 
            <>
              <button className="show-page-button-blue-button show-page-button review-button" onClick={()=>handleEditClick(review.text, review.rating, review._id)}>Edit</button>
              <button className="show-page-button-red-button show-page-button review-button" onClick={()=>handleDeleteClick(review._id)}>Delete</button>
            </>
          }
        </div>
      ))}
      {(creatorId !== sessionUser._id)&& showReviewForm && <div className="create-new-review">
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
      </div>}
    </div>
    </>
  );
};

export default QuestShowReviews;
