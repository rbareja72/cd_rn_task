import MainReducer from './main-reducer';
import { combineReducers, createStore } from 'redux';

const reducer = combineReducers({ MainReducer });

const store = createStore(reducer);

export default store;
