import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Импортируем корневой компонент приложения
import { Provider } from 'react-redux';
import { store } from './state';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);