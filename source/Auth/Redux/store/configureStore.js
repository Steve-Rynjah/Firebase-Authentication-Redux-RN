import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from '../reducer'

const configureStore = () => 
        createStore(reducers, {}, applyMiddleware(ReduxThunk));

const store = configureStore();

export default store;