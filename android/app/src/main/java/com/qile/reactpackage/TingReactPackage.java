package com.qile.reactpackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.qile.module.TingModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2018/10/24.
 */

public class TingReactPackage implements ReactPackage {

    public TingModule tingModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        tingModule =new TingModule(reactContext);
        List<NativeModule> modules = new ArrayList<>();
        modules.add( tingModule );
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
