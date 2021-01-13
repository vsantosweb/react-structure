import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import sampleData from './store/actions/sample/SampleReducer';

const reducers = combineReducers({ 
    sampleData
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;