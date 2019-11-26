import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { reduxStore } from './redux/store';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import { en, es } from './translations';

const languageDetectorOpts = {
    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement
};

i18next.use(LanguageDetector).init({
    interpolation: { escapeValue: false },
    ns: ['osudio'],
    defaultNS: 'osudio',
    resources: {
        en: {
            osudio: en               // 'osudio' is our custom namespace
        },
        es: {
            osudio: es
        },
    },
    react: {
        wait: true
    },
    detection: languageDetectorOpts
});


ReactDOM.render(<I18nextProvider i18n={i18next}><Provider store={reduxStore}><App /></Provider></I18nextProvider>, document.getElementById('root'));

serviceWorker.register();
