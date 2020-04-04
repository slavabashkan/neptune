import { applyMiddleware, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { DispatchAction } from '../actions';
import { rootReducer, RootState } from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, DispatchAction>));

export default store;
