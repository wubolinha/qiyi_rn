

import * as  types from '../Constances'



const urlprefix = "http://childrenedu.oss-cn-shenzhen.aliyuncs.com/";


export   function OSSRead_jsonResolv(  json) {

    dispatch(  Reading() );

    for (var key in json) {
        var value = json[key];
        if (value.indexOf('json') != -1) {   //包含某个字符串
            var finalurl =  urlprefix + value
            console.log("url : "+finalurl)
            fetch(finalurl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then((result) => {
                    //  已经获取到了数据，如何传递给每个界面呢？
                    console.log(result);
                    dispatch(  ReadSuccess( true, result  ) );

                }).catch((err) => {
                console.error(err);

                dispatch(  ReadError( ) );
            });
        }
    }
}


function Reading() {
    return {
        type: types.OSS_READ_DOING
    }

}

function ReadSuccess(isSuccess,data) {
    return {
        type: types.OSS_READ_DONE,
        user:data,
    }
}

function ReadError() {
    return{
        type:types.OSS_READ_ERROR,
    }
}













