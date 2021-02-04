import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';

import LayoutReducer from './app/layouts/reducer';
import CustomerReducer from './app/pages/customers/reducer';
import storage from 'redux-persist/lib/storage/session';

const reducers = combineReducers({ 
    layout:LayoutReducer,
    customer:CustomerReducer
});

const persistConfig = {
    key: 'app',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, undefined, applyMiddleware(thunk));

const persistor = persistStore(store);

export { store, persistor };