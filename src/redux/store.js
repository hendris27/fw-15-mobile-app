import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = configureStore({
  reducer,
  middleware: [logger, thunk],
});
export default store;
