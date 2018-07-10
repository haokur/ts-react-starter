
import { createStore  } from 'redux' ;
// import thunk from 'redux-thunk' ;

import rootReducer from './reducers' ;

export const configStore = createStore(rootReducer);