import Request from '../../../../utils/Request';
const apiUrl = process.env.REACT_APP_API_URL;

export default class CharactersActions {
    static FIND_CHARACTERS = 'FIND_CHARACTERS';
    static FIND_CHARACTER = 'FIND_CHARACTER';

    static findCharacters() {
        return (dispatch) => {
            Request.get(
                apiUrl + 'people',
                (response) => {
                    dispatch({
                        type: CharactersActions.FIND_CHARACTERS,
                        payload: { charactersList: response.results }
                    });
                },
                (error) => {
                    console.log('Error finding characters: ', error)
                }
            );
        }
    }

    static findCharacter(id) {
        return (dispatch) => {
            Request.get(
                apiUrl + 'people/' + id,
                (response) => {
                    dispatch({
                        type: CharactersActions.FIND_CHARACTER,
                        payload: { characterDetail: response }
                    });
                },
                (error) => {
                    console.log('Error finding character: ', error)
                }
            );
        }
    }

    static clearCharacterDetail() {
        return (dispatch) => {
            dispatch({
                type: CharactersActions.FIND_CHARACTER,
                payload: { characterDetail: null }
            });
        }
    }
}