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


function App() {
  const dispatch = useDispatch()
  const words = useSelector(state => state.words)
  const containerRef = useRef(null)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [currentMaxFontSize, setCurrentMaxFontSize] = useState({
    minFont: 35,
    maxFont: 70
  });

  const calcMinFont = () => {
    const baseWidth = 1920; // Базовая ширина
    const baseHeight = 1080; // Базовая высота

    // Рассчитываем коэффициенты для ширины и высоты
    const widthFactor = windowSize.width / baseWidth;
    const heightFactor = windowSize.height / baseHeight;

    // Используем минимальный коэффициент, чтобы избежать слишком маленького шрифта
    const currentFactor = Math.min(widthFactor, heightFactor);

    // Устанавливаем новые размеры шрифта
    setCurrentMaxFontSize(prevState => ({
      minFont: Math.max(prevState.minFont * currentFactor, 20), // Устанавливаем минимальный размер шрифта
      maxFont: Math.max(prevState.maxFont * currentFactor, 50)  // Устанавливаем минимальный размер шрифта
    }));
  };

  useEffect(() => {
    calcMinFont(); // Вызываем функцию при монтировании компонента
    window.addEventListener('resize', calcMinFont); // Добавляем обработчик события resize

    return () => {
      window.removeEventListener('resize', calcMinFont); // Убираем обработчик при размонтировании
    };
  }, [windowSize]);
  
  
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

        if (fontSize >= currentMaxFontSize.maxFont) {
          el.classList.add('bold');
        } else if (fontSize >= currentMaxFontSize.minFont) {
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
  deterministic: true,
  // fontSizes: [currentMaxFontSize.minFont, currentMaxFontSize.maxFont],
  fontSizes: [currentMaxFontSize.minFont, currentMaxFontSize.maxFont],
  padding: 2,
  rotations: 0,
  rotationAngles: 0,
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 500,
};

  return (
    <div className='app'>
      <div className='title_container'>
        <h1 className='title'>Рейтинг российских ученых <br/> по версии участников КМУ 2024</h1>
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