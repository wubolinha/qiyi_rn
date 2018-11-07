
import {
    NativeModules ,
    DeviceEventEmitter
} from 'react-native'



export function ToastShow(message){

    NativeModules.TingModule.toastShow(message,1000);
}



export function CallbackTool(message,para,callback){


    NativeModules.TingModule.getCallbackData(message,para,callback);
}


export function PromiseTool(message){

    NativeModules.TingModule.getPromiseData(message).then(
        (data)=>{
            alert(data)
        }
    ).catch(
        alert("PromiseTool error")
    );
}

export  function ListenTool() {

    DeviceEventEmitter.addListener('Event', function  (msg) {


        ToastShow(  msg.key  );


    });

}

// SendEvent 发出去后 ListenTool 会收到
export  function SendEvent() {

    NativeModules.TingModule.sendEvent();
}







