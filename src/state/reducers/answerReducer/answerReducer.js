import { SET_ANSWERS } from "./types";

export const answerReducer = (state = [], action) => {
    switch (action.type) {
        case SET_ANSWERS:
            return action.payload
        default: return state
    }
}