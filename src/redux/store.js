import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
