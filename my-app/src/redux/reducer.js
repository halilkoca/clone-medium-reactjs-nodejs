import { combineReducers } from 'redux';
import articles from './reducers/articles';
import authUser from './reducers/authUser';
import common from './reducers/common';
import { connectRouter } from "connected-react-router";

export default history => combineReducers({
    articles,
    authUser,
    common,
    router: connectRouter(history)
});
