import React from 'react';
import ReactDOM from 'react-dom';
import './assets/medium.css';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import configureStore, { history } from "./redux/store";
import { getUser } from "./redux/actions/actions";
import reportWebVitals from './reportWebVitals';

const store = configureStore();

if (localStorage.Auth) {
  store.dispatch({ type: 'SET_USER', user: JSON.parse(localStorage.Auth) })
  var _id = JSON.parse(localStorage.Auth)._id
  getUser(_id).then((res) => {
    store.dispatch({ type: 'SET_USER', user: res })
  })
}

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();