import { createStore, applyMiddleware, compose } from 'redux';
import todoApp from './reducer';
import thunk from 'redux-thunk';


const logger = store => next => action => {
    console.log(action);
    next(action);
    console.log('执行了');
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(todoApp, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk, logger)));
export default store;


