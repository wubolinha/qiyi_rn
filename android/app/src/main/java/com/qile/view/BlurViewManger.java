package com.qile.view;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.resource.bitmap.CenterCrop;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import jp.wasabeef.glide.transformations.BlurTransformation;

/**
 * Created by Administrator on 2018/11/5.
 */

public class BlurViewManger extends SimpleViewManager<BlurView> {

    private static final String REACT_CLASS = "BlurView";
    private BlurView blurView = null;
    private ThemedReactContext reactContext;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected BlurView createViewInstance(ThemedReactContext reactContext) {
        if (blurView == null) {
            blurView = new BlurView(reactContext);
        }
        this.reactContext=reactContext;
        return blurView;
    }

    /*******
     *  通过@ReactProp(或 @ReactPropGroup)注解来导出属性
     *   这个方法必须是  public
     * ********/
    @ReactProp(name = "imgSource")
    public void setSource(BlurView blurView, String source) {

       // Glide.with(reactContext).load(source).into(blurView);

        Glide.with(reactContext).load( source )
                .bitmapTransform(new BlurTransformation(reactContext, 25), new CenterCrop(reactContext))
                .into(blurView);
    }

}
