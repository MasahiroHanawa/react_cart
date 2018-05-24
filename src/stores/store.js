import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import * as reducers from '../reducers';

export default function finalCreateStore() {
  const store = compose(applyMiddleware(thunk))(createStore)
  return store(
    combineReducers({
      ...reducers,
      routing: routerReducer
    })
  )
}
