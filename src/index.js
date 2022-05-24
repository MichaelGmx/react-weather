import React from 'react';
import ReactDOM from 'react-dom/client';

import WeatherApp from './WeatherApp';
// import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

// 全局样式
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.register();