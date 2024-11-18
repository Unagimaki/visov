import { SET_ANSWERS } from "./types"

export const actionSetAnswers = (arr) => {
    return {
        type: SET_ANSWERS,
        payload: arr
    }
}