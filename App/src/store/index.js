import MainReducer from './main-reducer';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({ MainReducer });

const store = createStore(reducer, {}, applyMiddleware(thunk));

export default store;
