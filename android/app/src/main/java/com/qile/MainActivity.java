package com.qile;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.qile.module.TingModule;
import com.qile.module.XmlyTool;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "qile";
    }

    @Override
    protected void onStart() {
        super.onStart();

     //   XmlyTool.instance.getCategories("儿歌");
    }
}
