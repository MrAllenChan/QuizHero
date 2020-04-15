import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import setUserNameReducer from './store/reducers/login';
// import apartmentsReducer from './store/reducers/apartments'

const rootReducer = combineReducers({
    setUserName: setUserNameReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;