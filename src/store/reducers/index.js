
import { combineReducers } from 'redux';

import shopCart from './counter'

const store = combineReducers({
    shopCart$: shopCart,
})

export default store;
