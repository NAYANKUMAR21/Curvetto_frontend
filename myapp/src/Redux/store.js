import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthReducer } from './reducer/auth.reducer';
import { blogReducer } from './reducer/blogs.reducer';

const rootReducer = combineReducers({
  Auth: AuthReducer,
  blog: blogReducer,
});

// const createComposer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;
export const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
