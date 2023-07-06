import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const state = JSON.parse(localStorage.getItem('book-store-state') || '{}');

const store = createStore(rootReducer, state, composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(() => localStorage.setItem('book-store-state', JSON.stringify(store.getState())));

export default store;
