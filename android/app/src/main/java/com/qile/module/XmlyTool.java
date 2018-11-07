package com.qile.module;

import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.Callback;
import com.google.gson.Gson;
import com.ximalaya.ting.android.opensdk.constants.DTransferConstants;
import com.ximalaya.ting.android.opensdk.datatrasfer.CommonRequest;
import com.ximalaya.ting.android.opensdk.datatrasfer.IDataCallBack;
import com.ximalaya.ting.android.opensdk.model.album.Album;
import com.ximalaya.ting.android.opensdk.model.album.AlbumList;
import com.ximalaya.ting.android.opensdk.model.category.Category;
import com.ximalaya.ting.android.opensdk.model.category.CategoryList;
import com.ximalaya.ting.android.opensdk.model.track.Track;
import com.ximalaya.ting.android.opensdk.model.track.TrackList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018/10/27.
 */

public enum XmlyTool {

    instance;

    // 获取喜马拉雅内容分类
    public void  getCategories(final String tagName, final Callback callback){
        Log.w("test","获取喜马拉雅内容分类 " );
        Map<String, String> map = new HashMap<String, String>();
        CommonRequest.getCategories(map, new IDataCallBack<CategoryList>() {
            @Override
            public void onSuccess(@Nullable CategoryList categoryList) {
                List<Category> categories=categoryList.getCategories();
                for(Category  item:categories){
                    //   Log.w("test","item:  "+  item.getId()  +"  "+item.getCategoryName()+"  "+item.getCoverUrlLarge() );
                    if(item.getCategoryName().equals("儿童")){
                        Log.w("test","item:  "+  item.getId()  +"  "+item.getCategoryName()+"  "+item.getCoverUrlLarge() );
                        //     test2( item.getId() +"");
                        getAlbumList(  item.getId() +"" ,tagName ,callback);
                        break;
                    }
                }
            }
            @Override
            public void onError(int i, String s) {
                Log.e("test","获取喜马拉雅内容分类:  "+i+"  "+s);
            }
        });
    }

    //  根据分类和标签获取某个分类某个标签下的专辑列表
    private void  getAlbumList(String mCategoryId, String tagname , final Callback callback){

        Log.w("test","根据分类和标签获取某个分类某个标签下的专辑列表 \n" );
        Map<String ,String> map = new HashMap<String, String>();
     //   map.put(DTransferConstants.TAG_NAME ,"故事");
        if( !TextUtils.isEmpty(tagname) ){
           map.put(DTransferConstants.TAG_NAME ,tagname);
        }
        map.put(DTransferConstants.CATEGORY_ID ,mCategoryId);  //分类ID，指定分类，为0时表示热门分类
        map.put(DTransferConstants.CALC_DIMENSION ,"1"); // 计算维度，现支持最火（1），最新（2），经典或播放最多（3）
        map.put(DTransferConstants.PAGE ,"1");     //返回第几页，必须大于等于1，不填默认为1

        CommonRequest.getAlbumList(map, new IDataCallBack<AlbumList>() {
            @Override
            public void onSuccess(@Nullable AlbumList albumList) {
                for(Album album : albumList.getAlbums() ){
                 //   Log.w("test","  "+ album.toString()  );
                  //  getTracks( album.getId() +"" );
                }
                String data = JSON.toJSONString(albumList);
                callback.invoke(  data );

            }

            @Override
            public void onError(int i, String s) {
                Log.e("test","根据分类和标签获取某个分类某个标签下的专辑列表:  "+i+"  "+s);
            }
        });

    }


    // 专辑浏览，根据专辑ID获取专辑下的声音列表
    public void  getTracks( String AlbumId , final Callback callback ){
        Log.w("test","专辑浏览，根据专辑ID获取专辑下的声音列表 "+AlbumId );
        Map<String, String> map = new HashMap<String, String>();
        map.put(DTransferConstants.ALBUM_ID, AlbumId);  //专辑ID
        map.put(DTransferConstants.SORT, "asc"); // "asc"表示喜马拉雅正序，"desc"表示喜马拉雅倒序，"time_asc"表示时间升序，"time_desc"表示时间降序，默认为"asc"
        map.put(DTransferConstants.PAGE, "1");  //当前第几页，不填默认为1
        CommonRequest.getTracks(map, new IDataCallBack<TrackList>() {
            @Override
            public void onSuccess(@Nullable TrackList trackList) {
                for(Track track: trackList.getTracks()){
                    Log.w("test","  "+ track.toString());
                }
                 String data = JSON.toJSONString(trackList);
                 callback.invoke(  data );
            }

            @Override
            public void onError(int i, String s) {
                Log.e("test","根据专辑ID获取专辑下的声音列表onError:  "+i+"  "+s);
            }
        });

    }



}
