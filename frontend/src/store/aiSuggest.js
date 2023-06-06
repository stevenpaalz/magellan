const SET_AI = 'ai/SET_AI'

export const setAI = (ai) => ({
    type:SET_AI,
    ai:ai
})

export default function aiReducer(state={}, action){
    const newState = {...state};
    switch(action.type){
        case SET_AI:
            newState["ai"] = action.ai;
            return newState;
        default:
            return state;
    }
}