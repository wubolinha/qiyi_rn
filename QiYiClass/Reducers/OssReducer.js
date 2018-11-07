
//阿里云oss状态


// 初始状态
import * as types from "../Constances";

const initOssReadState = {
    isSuccess: false,
    data: null,
}



// 不同类别的事件使用 switch 处理过程

export default function  ossReadReducer(state = initOssReadState , action) {
    switch (action.type) {
        case types.OSS_READ_DOING:

            var result= {
                ...state,
                isSuccess: false,
                data : null,
            }
            console.log("正在读取:  "+  JSON.stringify(result)   );
            return result
            break

        case types.OSS_READ_DONE:
            console.log("读取成功 ");
            return{
                ...state,
                isSuccess: true ,
                data :action.data,
            }

            break

        case types.OSS_READ_ERROR:
            console.log("读取失败 ");
            return{
                ...state,
                isSuccess: false ,
                data : null,
            }
            break

        default:
            return state;

    }
}