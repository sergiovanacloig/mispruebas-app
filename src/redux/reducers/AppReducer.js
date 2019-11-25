import AppActions from '../actions/AppActions';

const initialStateApp = {
    title: 'Star wars',
};

export function AppReducer(state = initialStateApp, action) {
    switch (action.type) {
        case AppActions.CHANGE_TITLE:
            return Object.assign({}, state, {
                title: action.payload.title
            });
        case AppActions.CLEAR_STATE:
            return initialStateApp
        default:
            return state;
    }
}