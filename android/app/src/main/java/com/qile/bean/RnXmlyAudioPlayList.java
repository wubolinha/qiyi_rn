package com.qile.bean;

import com.ximalaya.ting.android.opensdk.model.track.Track;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2018/11/12.
 */

public class RnXmlyAudioPlayList {


    List<MyTrack> list;
    String index;
    String  albumId;

    public List<MyTrack> getList() {
        return list;
    }

    public void setList(List<MyTrack> list) {
        this.list = list;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }

    /**********************/

    public List<Track> transTotrack(List<MyTrack> list) {

        List<Track> trackList=new ArrayList<>();
        for (MyTrack temp: list) {
            trackList.add( temp.getValue() );
        }
        return trackList;
    }

    /*******************************************/

    class MyTrack {

        String key;
        Track value;

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }

        public Track getValue() {
            return value;
        }

        public void setValue(Track value) {
            this.value = value;
        }
    }
}
