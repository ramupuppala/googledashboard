// npm dependencies
import { combineReducers }          from 'redux';

//reducers imports
import userReducer from './userReducer';

/**
 * Combine all reducers into root reducer
 */
const rootReducer = combineReducers({
    userReducer
  });
  
  export default rootReducer;