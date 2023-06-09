import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import jwtFetch from './store/jwt';
import * as eventActions from './store/events.js'

let store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.jwtFetch = jwtFetch;
  window.eventActions = eventActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
