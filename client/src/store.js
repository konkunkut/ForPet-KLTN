import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import {LOGIN_SUCCESS} from './action/constants'
import thunk from 'redux-thunk';
const initialState = {}

const middleWare = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

var data = sessionStorage.getItem("token");
if(data){
  store.dispatch({type : LOGIN_SUCCESS});
}

export default store;