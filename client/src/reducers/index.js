import {combineReducers} from 'redux';
import identifyReducers from './identify.reducers';

export default combineReducers({
    config: identifyReducers,
});