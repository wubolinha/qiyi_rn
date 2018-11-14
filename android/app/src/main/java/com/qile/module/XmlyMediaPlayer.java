package com.qile.module;

import android.content.Context;
import android.support.annotation.Nullable;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.qile.bean.AudioPlayStatus;
import com.qile.bean.RnXmlyAudioPlayList;
import com.ximalaya.ting.android.opensdk.model.PlayableModel;
import com.ximalaya.ting.android.opensdk.model.advertis.Advertis;
import com.ximalaya.ting.android.opensdk.model.advertis.AdvertisList;
import com.ximalaya.ting.android.opensdk.model.track.Track;
import com.ximalaya.ting.android.opensdk.player.XmPlayerManager;
import com.ximalaya.ting.android.opensdk.player.advertis.IXmAdsStatusListener;
import com.ximalaya.ting.android.opensdk.player.service.IXmPlayerStatusListener;
import com.ximalaya.ting.android.opensdk.player.service.XmPlayerConfig;
import com.ximalaya.ting.android.opensdk.player.service.XmPlayerException;

import java.util.List;

/**
 * Created by admin on 2018/11/6.
 */

public class XmlyMediaPlayer {

    private ReactApplicationContext reactContext;
    private boolean isInit=false;
    private XmPlayerManager.IConnectListener initListen=null;
    private AudioPlayStatus audioStatus;

    public XmlyMediaPlayer(ReactApplicationContext context) {
        this.reactContext = context;
        init();
    }

    public  void  init(){
        audioStatus=new AudioPlayStatus();
        XmPlayerManager.getInstance(reactContext).init();
        isInit=true;
        XmPlayerManager.getInstance(reactContext).addPlayerStatusListener( playListen );
        XmPlayerManager.getInstance(reactContext).addAdsStatusListener( adsListen);

        initListen=new XmPlayerManager.IConnectListener() {
            @Override
            public void onConnected() {
                XmPlayerConfig.getInstance(reactContext).setUseTrackHighBitrate(true);//一直加载高音质
              //  XmPlayerManager.getInstance(reactContext).setBreakpointResume(false); //不希望记住播放记录(即每次播放从头开始播放)
            }
        };
        // 初始化完成
        XmPlayerManager.getInstance(reactContext).addOnConnectedListerner(initListen );

        Log.w("test","XmlyMediaPlayer  init   "+isInit);
    }

//   解析传递过来的json数据，然后开始播放
//    export const constants = {
//                list: ' ',
//                index: ' ',
//    };
    public void  resolveJson(String text ){

        if(audioStatus==null){
            audioStatus =new AudioPlayStatus();
        }

        RnXmlyAudioPlayList playList= JSON.parseObject( text,  RnXmlyAudioPlayList.class);
        int index =   Integer.parseInt( playList.getIndex());
        List<Track> trackList =playList.transTotrack( playList.getList() );
        startPlay(   trackList  , index );

       // audioStatus.setTrack( trackList.get(index) );
        audioStatus.setIndex(  index );
        audioStatus.setAlbumId( playList.getAlbumId()  );
        Log.w("test","解析传递过来的index:  "+index + "  albumId: "+playList.getAlbumId()  +"  >>> "+  trackList.get(index  )   );
    }

    public void startPlay(List<Track> list, int startIndex){
        if(isInit ==false){
            init();
        }
        Log.w("test","startPlay : "+startIndex);
        XmPlayerManager.getInstance(reactContext).playList(list,startIndex);
    }

    public void pause( ){
        XmPlayerManager.getInstance(reactContext).pause();
    }


    // 注销播放器
    public void  destory(){
        XmPlayerManager.getInstance(reactContext).removeAdsStatusListener(adsListen );
        XmPlayerManager.getInstance(reactContext).removePlayerStatusListener( playListen);
        XmPlayerManager.getInstance(reactContext).removeOnConnectedListerner(initListen);
        XmPlayerManager.release();
        isInit=false;
    }

/*********************
 *
 *  播放器状态监听
 * ******************************/

     IXmPlayerStatusListener playListen=new IXmPlayerStatusListener() {
        @Override
        public void onPlayStart() {
            Log.w("test","开始播放....");
            audioStatus.setPlayStatus("playing");
            sendEvent( JSON.toJSONString( audioStatus ) );
        }

        @Override
        public void onPlayPause() {
            Log.w("test","暂停播放....");
            audioStatus.setPlayStatus("pause");
            sendEvent( JSON.toJSONString( audioStatus ) );
        }

        @Override
        public void onPlayStop() {
            Log.w("test","停止播放....");
            audioStatus.setPlayStatus("stop");
            sendEvent( JSON.toJSONString( audioStatus ) );
        }

        @Override
        public void onSoundPlayComplete() {
            Log.w("test","播放完成....");
            audioStatus.setPlayStatus("stop");
            sendEvent( JSON.toJSONString( audioStatus ) );
        }

        @Override
        public void onSoundPrepared() {
            Log.w("test","播放器准备完毕...");
        }

        @Override
        public void onSoundSwitch(PlayableModel playableModel, PlayableModel playableModel1) {
            Log.w("test","切歌...");
        }

        @Override
        public void onBufferingStart() {
            Log.w("test","开始缓冲...");
        }

        @Override
        public void onBufferingStop() {
            Log.w("test","结束缓冲...");
        }

        @Override
        public void onBufferProgress(int percent) {
            Log.w("test","缓冲进度... "+percent+" %");
        }

        @Override
        public void onPlayProgress(int intcurrPos, int duration) {
            audioStatus.setDuration( duration  );
            audioStatus.setProgress(  intcurrPos );
            sendEvent( JSON.toJSONString( audioStatus ) );
          //  Log.w("test","播放进度回调... "+    ((float)100*intcurrPos/(float) duration) +" %" );
        }

        @Override
        public boolean onError(XmPlayerException e) {
            Log.e("test","播放错误... "+e.getLocalizedMessage());
            e.printStackTrace();
            return false;
        }
    };


     // 发送到 JS
    public   void sendEvent(  String jsonData ) {
        WritableMap params = Arguments.createMap();
        params.putString("key", jsonData);
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("AudioPlayEvent", params);
    }
    
/*********************
 *
 *  广告播放状态监听
 * ******************************/

    IXmAdsStatusListener  adsListen =new IXmAdsStatusListener() {
    @Override
    public void onStartGetAdsInfo() {
        audioStatus.setPlayStatus("prepare");
        sendEvent( JSON.toJSONString( audioStatus ) );
        Log.w("test","开始获取广告信息...");
    }

    @Override
    public void onGetAdsInfo(AdvertisList advertisList) {
        Log.w("test","获取广告信息成功...");
    }

    @Override
    public void onAdsStartBuffering() {
        Log.w("test","广告开始缓冲...");
    }

    @Override
    public void onAdsStopBuffering() {
        Log.w("test","广告结束缓冲...");
    }

    @Override
    public void onStartPlayAds(Advertis advertis, int position) {
        Log.w("test","开始播放广告... "+advertis.toString());
    }

    @Override
    public void onCompletePlayAds() {
        Log.w("test","广告播放结束...");
    }

    @Override
    public void onError(int what, int extra) {
        Log.w("test","播放广告错误... "+what+"   "+extra);
    }
};

}
