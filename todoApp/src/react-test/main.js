import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Link, hashHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App.js';
import About from './About.js';
import Perf from 'react-addons-perf';
import { whyDidYouUpdate } from 'why-did-you-update';
window.Perf = Perf;


// if (process.env.NODE_ENV !== 'production') {
//     whyDidYouUpdate(React);
// }

const logger = store => next => action => {
    console.log('dispatch: ', action);
    next(action);
    console.log('finish: ', action);
}

const routes = {
    path: '/',
    component: App,
    childRoutes: [
        { path: '/about', component: About }
    ]
}


const store = createStore(combineReducers({
    word(state = 'kel like listenning music', action) {
        switch (action.type) {
            case 'think': return "i'm thinking my hobby now";
            case 'job': return 'front end developer';
            case 'hobby': return 'basketball movie traval';
            default: return state;
        }
    }
}), composeWithDevTools(applyMiddleware(logger, thunk)));
render(<Provider store={store}>
    <App name={'hyhy'} />
</Provider>, document.getElementById('app'));