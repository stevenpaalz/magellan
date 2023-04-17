import jwtFetch from "./jwt";

export const RECEIVE_ALL_QUESTS = "quests/RECEIVE_ALL_QUESTS";
export const RECEIVE_QUEST = "quests/RECEIVE_QUEST";
export const REMOVE_QUEST = "quests/REMOVE_QUEST";
export const RECEIVE_QUEST_REVIEWS = "quests/RECEIVE_QUEST_REVIEWS";

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

export const getAllQuests = () => async dispatch => {
    const res = await jwtFetch('/api/quests');
    const quests = await res.json();
    return dispatch(receiveAllQuests(quests));
};

export const getQuest = (questId) => async dispatch => {
    const res = await jwtFetch(`/api/quests/${questId}`);
    const quest = await res.json();
    return dispatch(receiveQuest(quest));
};

export const getQuestReviews =(questId) => async dispatch => {
    const res = await jwtFetch(`/api/quests/${questId}/reviews`);
    const reviews = await res.json();
    return dispatch(receiveQuestReviews(reviews));
};

//quest is formData
export const createQuest = (formData) => async dispatch => {
    const res = await jwtFetch('/api/quests', {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        const quest = await res.json();
        dispatch(receiveQuest(quest));
    };
};

export const updateQuest = (formData, questId) => async dispatch => {
    const res = await jwtFetch(`/api/quests/${questId}`, {
        method: 'PATCH',
        body: formData
    });
    if (res.ok) {
        const quest = await res.json();
        dispatch(receiveQuest(quest));
    };
};

export const deleteQuest = (questId) => async dispatch => {
    const res = await jwtFetch(`/api/quests/${questId}`, {
        method: 'DELETE'
    });
    dispatch(removeQuest(questId));
};

function questsReducer(state = {}, action) {
    switch(action.type) {
        case RECEIVE_ALL_QUESTS:
            return { ...action.quests };
        case RECEIVE_QUEST:
            return { ...state, [action.quest.id]: action.quest };
        case REMOVE_QUEST:
            const newQuest = { ...state };
            delete newQuest[action.questId];
            return newQuest;
        default: 
            return state;
    };
};