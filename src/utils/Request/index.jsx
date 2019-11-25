export default class Request {

    static getDefaultHeaders() {
        const defaultHeaders = {
            'Accept': 'application/json',
        };

        // TODO If we have authentication there is the line to put the authorization header
        // let userToken = reduxStore.getState().app.userLogged;

        // if (userToken) {
        //     defaultHeaders['Authorization'] = `Token token=${userToken}`;
        // }

        return defaultHeaders;
    }

    static get(url, callbackSuccess = null, callbackError = null, headers = {}) {
        return fetch(url, {
            method: 'GET',
            headers: Object.assign({}, Request.getDefaultHeaders(), headers)
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    if (typeof (callbackSuccess) === 'function') callbackSuccess(data);
                } else {
                    if (typeof (callbackError) === 'function') callbackError(data);
                }
            });
        }).catch(data => callbackError(data));
    }

    static post(url, body, callbackSuccess = null, callbackError = null, headers = {}) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: Object.assign({}, Request.getDefaultHeaders(), headers)
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    if (typeof (callbackSuccess) === 'function') callbackSuccess(data);
                } else {
                    if (typeof (callbackError) === 'function') callbackError(data);
                }
            });
        }).catch(data => callbackError(data));
    }

    static postMultiPart(url, body, callbackSuccess = null, callbackError = null, headers) {
        return fetch(url, {
            method: 'POST',
            body: body,
            headers: Object.assign({}, headers)
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    if (typeof (callbackSuccess) === 'function') callbackSuccess(data);
                } else {
                    if (typeof (callbackError) === 'function') callbackError(data);
                }
            });
        }).catch(data => callbackError(data));
    }

    static put(url, body, callbackSuccess = null, callbackError = null, headers = {}) {
        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: Object.assign({}, Request.getDefaultHeaders(), headers)
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    if (typeof (callbackSuccess) === 'function') callbackSuccess(data);
                } else {
                    if (typeof (callbackError) === 'function') callbackError(data);
                }
            });
        }).catch(data => callbackError(data));
    }

    static delete(url, callbackSuccess = null, callbackError = null, headers = {}) {
        return fetch(url, {
            method: 'DELETE',
            headers: Object.assign({}, Request.getDefaultHeaders(), headers)
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    if (typeof (callbackSuccess) === 'function') callbackSuccess(data);
                } else {
                    if (typeof (callbackError) === 'function') callbackError(data);
                }
            });
        }).catch(data => callbackError(data));
    }
}