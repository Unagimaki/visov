import ReactWordcloud from 'react-wordcloud';
import styles from './App.scss'
import React, { useEffect, useRef, useState } from 'react';
import { countScientists } from './helpers/countScientists';
import { convertObjectToArray } from './helpers/convertObjectToArray';
import { database } from './config/firebase';
import { ref, onValue } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { actionSetAnswers } from './state/reducers/answerReducer/actions';
import { actionSetWords } from './state/reducers/wordsReducer/wordsReducer';
import { calculatePercentage } from './helpers/calculatePercentage';
import { calculateNumFromProcent } from './helpers/calculateNumFromProcent';

function App() {
  const dispatch = useDispatch()
  const words = useSelector(state => state.words)
  const containerRef = useRef(null)

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const minvw = calculatePercentage(windowSize.width, 30)
  const maxvw = calculatePercentage(windowSize.width, 95)
  const fontMin = calculateNumFromProcent(minvw, windowSize.width)
  const fontMax = calculateNumFromProcent(maxvw, windowSize.width)
  console.log(fontMin);
  console.log(fontMax);
  
  
  
    useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight})
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    })
  }, [])
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (containerRef.current) {
        // Получаем все теги <text> внутри контейнера
        const textElements = containerRef.current.querySelectorAll('text');
        
        // Изменяем стиль fontWeight для каждого тега <text> в зависимости от размера шрифта
        textElements.forEach(el => {
          const fontSize = parseFloat(window.getComputedStyle(el).fontSize); // Получаем размер шрифта          
        el.classList.remove('bold', 'medium', 'light'); // Удаляем предыдущие классы

        if (fontSize >= 80) {
          el.classList.add('bold');
        } else if (fontSize >= 45) {
          el.classList.add('medium');
        } else {
          el.classList.add('light');
        }
        });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true, 
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [words]);

 const options = {
  colors: ["#fff"],
  enableTooltip: false,
  deterministic: false,
  fontSizes: [fontMin, fontMax],
  padding: 10,
  rotations: 1,
  rotationAngles: [0],
  scale: "linear",
  spiral: "archimedean",
  transitionDuration: 2000,
};

  return (
    <div className='app'>
      <div className='title_container'>
        <h1 className='title'>Заголовок заголовок</h1>
      </div>
      {
        words &&
        <div className='cloud_wrapper' ref={containerRef}>
          <ReactWordcloud options={options} words={words} />
        </div>
      }
    </div>
  );
}

export default App;