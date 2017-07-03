import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App.js';


const logger = store => next => action => {
    console.log('dispatch: ', action);
    next(action);
    console.log('finish: ', action);
}


const store = createStore(combineReducers({
    word(state = 'kel', action) {
        switch (action.type) {
            case 'think': return "i'm thinking my hobby now";
            case 'job': return 'front end developer';
            case 'hobby': return 'basketball movie traval';
            default: return 'listen music';
        }
    }
}), applyMiddleware(logger, thunk));
render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('app'));