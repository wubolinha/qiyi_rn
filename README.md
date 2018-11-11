
奇艺课堂RN版本

集成了 喜马拉雅儿童模块，六一儿童网大部分视频，以及其他收集到的数据

其中    喜马拉雅儿童模块 的数据 封装自 喜马拉雅 Android SDK ，其他的数据来自于 阿里云 OSS

毛玻璃效果封装android的 ImageView (以 glide 方式加载 )


注意事项：

1,打包：

$ cd android
$ gradlew assembleRelease

也可以：
cd android && gradlew assembleRelease


2, 切换AndroidStudio和 WebStorm 出现错误： Could not expand ZIP 。。。。。解决：

cd android && gradlew clean


3, apk存放目录:  qile\apk下载 










