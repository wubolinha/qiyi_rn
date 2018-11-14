package com.qile.bean;

import com.ximalaya.ting.android.opensdk.model.track.Track;

/**
 * Created by Administrator on 2018/11/12.
 */

public class AudioPlayStatus {

    private String playStatus;  // 播放状态:暂停，停止，播放中, 广告缓冲中
    private int   duration;   // 时长
    private int   progress;   //当前进度
    private Track  track;     // 音频播放信息
    private String  albumId;     // 专辑id
    private int  index;        // 在专辑中的位置

    public String getPlayStatus() {
        return playStatus;
    }

    public void setPlayStatus(String playStatus) {
        this.playStatus = playStatus;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getProgress() {
        return progress;
    }

    public void setProgress(int progress) {
        this.progress = progress;
    }

    public Track getTrack() {
        return track;
    }

    public void setTrack(Track track) {
        this.track = track;
    }

    public String getAlbumId() {
        return albumId;
    }

    public void setAlbumId(String albumId) {
        this.albumId = albumId;
    }

    public int getIndex() {
        return index;
    }

    public void setIndex(int index) {
        this.index = index;
    }
}
