import CharactersActions from './actions/characters.actions';

const initialStateApp = {
    charactersList: null,
    characterDetail: null
};

export function CharactersReducer(state = initialStateApp, action) {
    switch (action.type) {
        case CharactersActions.FIND_CHARACTERS:
            return Object.assign({}, state, {
                charactersList: action.payload.charactersList
            });
        case CharactersActions.FIND_CHARACTER:
            return Object.assign({}, state, {
                characterDetail: action.payload.characterDetail
            });
        default: 
            return state;
    }
}