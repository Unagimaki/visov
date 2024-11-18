const SET_WORDS = 'SET_WORDS'

export const actionSetWords = (arr) => {
   
    return {
        type: SET_WORDS,
        payload: arr
    }
}
export const wordsReducer = (state = [], action) => {
    switch (action.type) {
        case SET_WORDS:
            return action.payload
        default: return state 
    }
}