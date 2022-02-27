import React from 'react';
import ReactDOM from 'react-dom';
import './assets/medium.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './App';
import { store, history } from 'redux/store';
import { getUser } from "./redux/actions/actions";
import reportWebVitals from './reportWebVitals';

if (localStorage.Auth) {
  //update localstorage
  store.dispatch({ type: 'SET_USER', user: JSON.parse(localStorage.Auth) })
  var _id = JSON.parse(localStorage.Auth)._id
  getUser(_id).then((res) => {
    store.dispatch({ type: 'SET_USER', user: res })
  })
}

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();