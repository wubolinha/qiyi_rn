

'use strict'

import * as  types from '../constants/loginType'


// 模拟用户信息
let user = {
    name: 'zhangsan',
    age: 24
}


export function login() {

    console.log('登录方法');
    return dispatch =>{
        dispatch( isLogining() );
        let result = fetch('https://www.baidu.com/')
            .then(
                (res) =>{
                    console.log('dispatch  loginSuccess');
                    dispatch(loginSuccess(  true ,user ));
                }
            ).catch(
                (e)=>{
                    console.log('dispatch  loginError');
                    dispatch ( loginError()  )
                }
            )
    }

}

function isLogining() {
    return {
        type: types.LOGIN_IN_DOING
    }

}

function loginSuccess(isSuccess,user) {
    return {
        type: types.LOGIN_IN_DONE,
        user:user,
    }
}

function loginError() {
    return{
        type:types.LOGIN_IN_ERROR,
    }
}

