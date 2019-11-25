import { createStore } from 'redux';
import { RootReducer } from '../reducers/RootReducer';
import { loadState, saveState } from './sessionStorage';

export const reduxStore = createStore(
    RootReducer,
    loadState()
);

reduxStore.subscribe(() => {
  saveState(reduxStore.getState());
});