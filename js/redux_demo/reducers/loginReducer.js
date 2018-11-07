
'use strict'
import * as types from '../constants/loginType'


// 初始状态
const initState = {
    status: '点击登录',
    isSuccess: false,
    user: null,

}


// 不同类别的事件使用 switch 处理过程

export default function  loginIn(state = initState , action) {
    switch (action.type) {
        case types.LOGIN_IN_DOING:

            var result= {
                ...state,
                status: '正在登录',
                isSuccess: false ,
                user : null,
            }
            console.log("loginreducer: 正在登录 "+  JSON.stringify(result)   );
            return result
            break
        case types.LOGIN_IN_DONE:
            console.log("loginreducer: 登录成功 ");
            return{
                ...state,
                status: '登录成功',
                isSuccess: true ,
                user :action.user,
            }

            break
        case types.LOGIN_IN_ERROR:
            console.log("loginreducer: 登录失败 ");
            return{
                ...state,
                status: '登录失败',
                isSuccess: true ,
                user : null,
            }
            break

        default:
            return state;


    }
}

