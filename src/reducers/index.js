import { combineReducers } from 'redux';
import ListReducer from './Lists.js';
import StateApp from './StateApp.js';
import Colors from './Colors';

const allReducers = combineReducers({
    lists: ListReducer,
    stateApp: StateApp,
    colors: Colors,
})

export default allReducers;