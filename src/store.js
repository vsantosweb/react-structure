import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import LayoutReducer from './app/views/layouts/redux';

const reducers = combineReducers({ 
    LayoutReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;