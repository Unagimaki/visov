import { combineReducers, createStore } from "redux";
import { answerReducer } from "./reducers/answerReducer/answerReducer.js";
import { wordsReducer } from "./reducers/wordsReducer/wordsReducer.js";

const rootReducer = combineReducers({
    answers: answerReducer,
    words: wordsReducer
});

export const store = createStore(rootReducer)

// store.subscribe(() => console.log(store.getState()))