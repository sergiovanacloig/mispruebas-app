import { combineReducers } from 'redux';
import { AppReducer } from './AppReducer';
import { CharactersReducer } from '../../pages/characters/redux/reducer';

const combinedReducers = combineReducers({
    app: AppReducer,
    characters: CharactersReducer
});

export const RootReducer = (state, action) => {
    return combinedReducers(state, action);
}