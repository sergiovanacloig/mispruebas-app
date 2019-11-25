import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { reduxStore } from './redux/store';

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

serviceWorker.register();
