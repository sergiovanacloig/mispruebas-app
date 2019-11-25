export default class AppActions {
    static CHANGE_TITLE = 'CHANGE_TITLE';
    static CLEAR_STATE = 'CLEAR_STATE';

    static changeTitle(title) {
        return (dispatch) => {
            dispatch({
                type: AppActions.CHANGE_TITLE,
                payload: {
                    title: title
                }
            });
        }
    }

    static clearAppState() {
        return (dispatch) => {
            dispatch({
                type: AppActions.CLEAR_APP_STATE
            });
        }
    }
}