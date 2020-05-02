import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import setUserNameReducer from './store/reducers/login';

const rootReducer = combineReducers({
    setUserName: setUserNameReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;