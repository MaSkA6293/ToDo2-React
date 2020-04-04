import { combineReducers } from 'redux';
import ListReducer from './Lists.js';
import StateApp from './StateApp.js';
const allReducers = combineReducers({
    lists: ListReducer,
    stateApp: StateApp,
})
export default allReducers;