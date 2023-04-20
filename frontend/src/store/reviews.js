import jwtFetch from "./jwt";

export const RECEIVE_REVIEW = "reviews/RECEIVE_REVIEW";
export const RECEIVE_ALL_REVIEWS = "reviews/RECEIVE_ALL_REVIEWS";
export const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "reviews/RECEIVE_REVIEW_ERRORS";
export const CLEAR_REVIEW_ERRORS = "reviews/CLEAR_REVIEW_ERRORS";

const receiveAllReviews = (reviews) => ({
    type: RECEIVE_ALL_REVIEWS,
    reviews
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
});

const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review
})

const receiveReviewError = (errors) => ({
    type: RECEIVE_REVIEW_ERRORS,
    errors
});

export const clearReviewErrors = (errors) => ({
    type: CLEAR_REVIEW_ERRORS,
    errors
});

export const getAllReviews = () => async dispatch => {
    const res = await jwtFetch('/api/reviews');
    const data = await res.json();
    const reviews = {};
    Object.values(data).forEach((review) => {
        reviews[review._id] = review
    })
    return dispatch(receiveAllReviews(reviews));
};

export const deleteReview = (reviewId) => async dispatch => {
    const res = await jwtFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    dispatch(removeReview(reviewId));
};

export const createReview = (questId, review) => async dispatch => {
    try {
        
        const res = await jwtFetch(`/api/quests/${questId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(review)
        })
        console.log(res);
        const data = await res.json();
        dispatch(receiveReview(data));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveReviewError(resBody.errors));
        };
    }
}

function reviewsReducer(state = {}, action) {
    const newReview = { ...state };
    switch(action.type) {
        case RECEIVE_ALL_REVIEWS:
            return { ...action.reviews };
        case RECEIVE_REVIEW:
            newReview[action.review._id] = action.review;
            return newReview;
        case REMOVE_REVIEW:
            delete newReview[action.reviewId];
            return newReview;
        default:
            return state; 
    };
};

export default reviewsReducer; 

const nullErrors = null; 

export const reviewErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_REVIEW_ERRORS:
            return action.errors;
        case RECEIVE_REVIEW:
        case CLEAR_REVIEW_ERRORS:
            return nullErrors;
        default:
            return state; 
    };
};