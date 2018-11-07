'use strict'

import {  createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Reducers/RootReducer';


/****
 *
 *  applyMiddleware: 柯里化 的函数
 *
 *  柯里化函数的运行过程其实是一个参数的收集过程，我们将每一次传入的参数收集起来，并在最里层里面处理
 *
 * ******/
const creatStoreWithMiddleware =applyMiddleware(thunkMiddleware)(createStore);

export default function  configureStore(  initialState ) {

    const  store = creatStoreWithMiddleware( rootReducer, initialState  )
    return store;
}

