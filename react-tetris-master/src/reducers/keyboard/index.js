import { combineReducers } from 'redux-immutable';
// import * as reducerType from '../../unit/reducerType';

// import drop from './drop';
// import down from './down';
// import left from './left';
// import right from './right';
// import rotate from './rotate';
// import reset from './reset';
// import music from './music';
// import pause from './pause';

// const keyboardReducer = combineReducers({
//   drop,
//   down,
//   left,
//   right,
//   rotate,
//   reset,
//   music,
//   pause,
// }); 
const initState = false;
const makeReducer = (specialReducerType) => (state = initState, action) => {
  switch (action.type) {
    case specialReducerType:
      return action.data;
    default:
      return state;
  }
};
const makeFinalReducers = (selectors) => {
  const toUpper = str => str.split('').map(c => c.toUpperCase()).join('');
  const values = selectors.map(selector => ('KEY_' + toUpper(selector)));
  return values.reduce((composition, value, index) => {
    composition[selectors[index]] = makeReducer(value);
    return composition;
  }, {});
};
const reducers = ['down', 'drop', 'left', 'music', 'pause', 'reset', 'right', 'rotate'];
const keyboardReducer = combineReducers(makeFinalReducers(reducers));
export default keyboardReducer;
