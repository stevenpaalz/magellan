import jwtFetch from "./jwt";

export const RECEIVE_ALL_QUESTS = "quests/RECEIVE_ALL_QUESTS";
export const RECEIVE_QUEST = "quests/RECEIVE_QUEST";
export const REMOVE_QUEST = "quests/REMOVE_QUEST";
export const RECEIVE_QUEST_REVIEWS = "quests/RECEIVE_QUEST_REVIEWS";
export const RECEIVE_QUEST_REVIEW = "quests/RECEIVE_QUEST_REVIEW";
export const RECEIVE_QUEST_ERRORS = "quests/RECEIVE_QUEST_ERRORS";
export const CLEAR_QUEST_ERRORS = "quests/CLEAR_QUEST_ERRORS";

const receiveAllQuests = (quests) => ({
    type: RECEIVE_ALL_QUESTS,
    quests
}); 

const receiveQuest = (quest) => ({
    type: RECEIVE_QUEST,
    quest
});

const removeQuest = (questId) => ({
    type: REMOVE_QUEST, 
    questId
});

const receiveQuestReviews = (reviews) => ({
    type: RECEIVE_QUEST_REVIEWS,
    reviews
});

const receiveQuestReview = (review) => ({
    type: RECEIVE_QUEST_REVIEW,
    review
});

const receiveQuestError = (errors) => ({
    type: RECEIVE_QUEST_ERRORS,
    errors
});

export const clearQuestErrors = (errors) => ({
    type: CLEAR_QUEST_ERRORS,
    errors
});

export const getAllQuests = () => async dispatch => {
    try {
        const res = await jwtFetch('/api/quests');
        const data = await res.json();
        const quests = {}
        data.forEach ((e) => {
            quests[e._id] = e
        });
        return dispatch(receiveAllQuests(quests));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveQuestError(resBody.errors));
        };
    };
};

export const getQuest = (questId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/quests/${questId}`);
        const quest = await res.json();
        return dispatch(receiveQuest(quest));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveQuestError(resBody.errors));
        };
    };
};

export const getQuestReviews = (questId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/quests/${questId}/reviews`);
        const reviews = await res.json();
        return dispatch(receiveQuestReviews(reviews));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveQuestError(resBody.errors));
        };
    };
};

//review is formData
export const createQuestReview = (formData, questId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/quests/${questId}/reviews`, {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const review = await res.json();
            return dispatch(receiveQuestReview(review));
        };
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveQuestError(resBody.errors));
        };
    };
};

//quest is formData
export const createQuest = (formData) => async dispatch => {
    try {
        const res = await jwtFetch('/api/quests', {
            method: 'POST',
            body: formData
        });
        if (res.ok) {
            const quest = await res.json();
            dispatch(receiveQuest(quest));
            return quest._id;
        };
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveQuestError(resBody.errors));
        };
    };
};

export const updateQuest = (formData, questId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/quests/${questId}`, {
            method: 'PATCH',
            body: formData
        });
        if (res.ok) {
            const quest = await res.json();
            dispatch(receiveQuest(quest));
            return quest._id; 
        };
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveQuestError(resBody.errors));
        };
    };
};

export const deleteQuest = (questId) => async dispatch => {
    try {
        const res = await jwtFetch(`/api/quests/${questId}`, {
            method: 'DELETE'
        });
        dispatch(removeQuest(questId));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveQuestError(resBody.errors));
        };
    };
};

const nullErrors = null; 

export const questErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_QUEST_ERRORS:
            return action.errors;
        case RECEIVE_QUEST:
        case CLEAR_QUEST_ERRORS:
            return nullErrors;
        default:
            return state; 
    };
};


function questsReducer(state = {}, action) {
    switch(action.type) {
        case RECEIVE_ALL_QUESTS:
            return { ...action.quests };
        case RECEIVE_QUEST:
            return { ...state, [action.quest._id]: action.quest };
        case REMOVE_QUEST:
            const newQuest = { ...state };
            delete newQuest[action.questId];
            return newQuest;
        case RECEIVE_QUEST_REVIEWS:
            return { ...action.reviews };
        case RECEIVE_QUEST_REVIEW:
            return { ...state, [action.review.id]: action.review };
        default: 
            return state;
    };
};

export default questsReducer; 