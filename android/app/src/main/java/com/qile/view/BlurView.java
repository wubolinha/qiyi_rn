package com.qile.view;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.widget.ImageView;

/**
 * Created by Administrator on 2018/11/5.
 */

@SuppressLint("AppCompatCustomView")
public class BlurView  extends ImageView {


    public BlurView(Context context) {
        super(context);
    }

    public BlurView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public BlurView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }


}
