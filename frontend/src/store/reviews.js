import jwtFetch from "./jwt";

export const RECEIVE_ALL_REVIEWS = "reviews/RECEIVE_ALL_REVIEWS";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";

const receiveAllReviews = (reviews) => ({
    type: RECEIVE_ALL_REVIEWS,
    reviews
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

export const getAllReviews = () => async dispatch => {
    const res = await jwtFetch('/api/reviews');
    const reviews = await res.json();
    return dispatch(receiveAllReviews(reviews));
};

export const deleteReview = (reviewId) => async dispatch => {
    const res = await jwtFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    dispatch(removeReview(reviewId));
};

function reviewsReducer(state = {}, action) {
    switch(action.type) {
        case RECEIVE_ALL_REVIEWS:
            return { ...action.reviews };
        case REMOVE_REVIEW:
            const newReview = { ...state };
            delete newReview[action.reviewId];
            return newReview;
        default:
            return state; 
    };
};

export default reviewsReducer; 
