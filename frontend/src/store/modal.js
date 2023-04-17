const SET_MODAL = 'modal/SET_MODAL'

export const setModal = (modal) => ({
    type:SET_MODAL,
    modal:modal
})

export default function modalReducer(state={}, action){
    const newState = {...state};
    switch(action.type){
        case SET_MODAL:
            newState[modalState] = action.modal;
            return newState;
        default:
            return state;
    }
}