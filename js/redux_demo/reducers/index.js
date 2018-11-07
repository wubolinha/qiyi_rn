'use strict'

import   loginIn from './loginReducer'

import { combineReducers } from 'redux';

// 合并后的 reducer 可以调用各个子 reducer，并把它们的结果合并成一个 state 对象
const rootReducer = combineReducers({

    logIn: loginIn,
})

export default rootReducer;


