// import { createStore , combineReducers } from 'redux'

// // reducer1
// function counter(state=0,action){
//   switch (action.type) {
//     case 'INCREMENT':
//       return state+1
//     case 'DECREMENT':
//       return state+1
//     default:
//       return state
//   }
// }

// // reducer2
// function counter2(state='good',action){
//   switch (action.type) {
//     case 'MORNING':
//       return state+' morning'
//     case 'NIGHT':
//       return state+' night'
//     default:
//       return state
//   }
// }

// function counter3(state='good',action){
//   switch (action.type) {
//     case 'MORNING':
//       return state+' morning'
//     case 'NIGHT':
//       return state+' night'
//     default:
//       return state
//   }
// }

// 合并reducers => 返回一个函数
// const rootReducer = combineReducers({
//   counter,
//   counter2,
//   counter3
// })

// console.log(rootReducer)

// let store = createStore(counter)
// console.log(store)

// store.subscribe(()=>{
//   console.log(store.getState())
// })

// store.dispatch({type:'INCREMENT'})
// store.dispatch({type:'INCREMENT'})
// store.dispatch({type:'INCREMENT'})


import { createStore  } from 'redux' ;
// import thunk from 'redux-thunk' ;

import rootReducer from './reducers' ;

export const configStore = createStore(rootReducer);