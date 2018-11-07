package com.qile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cmcewen.blurview.BlurViewPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.imagepicker.ImagePickerPackage;
import com.qile.reactpackage.BlurViewReactPackage;
import com.qile.reactpackage.TingReactPackage;
import com.rnfs.RNFSPackage;
import com.futurepress.staticserver.FPStaticServerPackage;
import com.reactlibrary.RNAliyunOssPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.ximalaya.ting.android.opensdk.datatrasfer.CommonRequest;

import java.util.Arrays;
import java.util.List;

// ReactApplicationContext
public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new BlurViewReactPackage(),
                    new OrientationPackage(),
                    new RNFetchBlobPackage(),
                    new ReactVideoPackage(),
                    new ImagePickerPackage(),
                    new RNFSPackage(),
                    new FPStaticServerPackage(),
                    new RNAliyunOssPackage(),
                    new TingReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        instance =this;
        CommonRequest.getInstanse().init(this, "80cf03ac6f0600a59aadff406fcfd496");
        CommonRequest.getInstanse().setDefaultPagesize(50); //返回的每页的条数
    }

    public static MainApplication instance;

}
