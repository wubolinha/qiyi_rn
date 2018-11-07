package com.qile.module;

import android.support.annotation.Nullable;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.qile.MainApplication;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/10/24.
 *
 *
 */

public class TingModule  extends ReactContextBaseJavaModule {


    ReactApplicationContext reactContext;
    public TingModule(ReactApplicationContext reactContext) {
        super(reactContext);
         this.reactContext=reactContext;
    }

    @Override
    public String getName() {
        return "TingModule";
    }

   @ReactMethod
    public void toastShow(String  message, int duration){
        Toast.makeText(getReactApplicationContext(),message,duration).show();
    }


    @ReactMethod
    public void getCallbackData(String  message, String  tagname, Callback callback){

        if( message.equals("getXmlyCategories")){
            XmlyTool.instance.getCategories(tagname,callback);
        }
        else if( message.equals("getTracks")){
            XmlyTool.instance.getTracks(tagname,callback);
        }
        else {
            callback.invoke(  message );
        }


    }



    @ReactMethod
    public void getPromiseData(String  message, Promise promise){

        promise.resolve(message);
    }

//  WritableMap一般是用于从原生传给rn的数据类型。
//  ReadableMap一般是用于rn传向原生时候的数据类型。比如还是一个rn调用的方法，
    @ReactMethod
    public void sendEvent(){
        WritableMap params = Arguments.createMap();
        params.putString("key", "myData");
        sendEvent(reactContext,"Event",params);
    }

  // 对应 DeviceEventEmitter.addListener('Event', function ... }
    public   void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }


    // 返回带map 数据
    @Override
    public Map<String, Object> getConstants() {
        //让js那边能够使用这些常量
        Map<String,Object> constants = new HashMap<>();
        constants.put("name", "bolin");
        constants.put("age", "27");
        return constants;
    }



}
