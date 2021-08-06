import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import reducers from './reducers';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// init store
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const dispatch = store.dispatch as Function;

export const getState = store.getState as Function;

export default store;
