//npm dependencies
import { createStore, applyMiddleware, compose }       from 'redux'

//reducer imports
import rootReducer                                     from '../reducer/rootReducer';

/**
 * Configure the store with reducers and middlewares.
 */
export default function configureStore() {
    return createStore(
      rootReducer
    );
  };
  