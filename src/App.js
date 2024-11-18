import ReactWordcloud from 'react-wordcloud';
import './App.scss';
import React, { useEffect, useState } from 'react';
import { countScientists } from './helpers/countScientists';
import { example } from './helpers/example';
import { convertObjectToArray } from './helpers/convertObjectToArray';
import { options } from './config/wordCloud';
import { database } from './config/firebase';
import { ref, onValue } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetAnswers } from './state/reducers/answerReducer/actions';
import { actionSetWords } from './state/reducers/wordsReducer/wordsReducer';

function App() {
  const dispatch = useDispatch()
  const arr = convertObjectToArray(example)
  const words = useSelector(state => state.words)

  useEffect(() => {
    const answersRef = ref(database, 'answers');
    onValue(answersRef, (snapshot) => {
      // обновленные данные
      const data = snapshot.val();
      
      // количество ученых
      const scientists = countScientists(convertObjectToArray(data))

      // сохраненеие в стейт
      dispatch(actionSetAnswers(convertObjectToArray(data)))
      dispatch(actionSetWords(scientists))       
    });
  }, []);

  return (
    <div className="App">
      {
        words &&
        <div style={{ width: "100%", height: "100%" }}>
          <ReactWordcloud options={options} words={words} />
        </div>
      }
    </div>
  );
}

export default App;