import { combineReducers } from 'redux';
import articles from './reducers/articles';
import authUser from './reducers/authUser';
import common from './reducers/common';
import { ConnectedRouter, connectRouter } from "connected-react-router";

export default combineReducers({
    articles,
    authUser,
    common,
    router: connectRouter(history)
});
