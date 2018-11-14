
奇艺课堂 React Native 版本,用户定位是10岁以下儿童和家长，设计了四大模块：

1 主页 ：集成了喜马拉雅FM的儿童模块，即：推荐，故事，儿歌，科普，国学，英语，哄睡，母婴。

2 课堂： 集成了61儿童网大部分的儿歌，幼儿教育，古诗，故事，成语 等，接近 2000个动画视频

3 趣味：收集了 儿童搞笑，宠物，零食制作，亲子 等 一些益趣小视频

4 热点：收集了一些教育专家和家长，老师的文章，


其中    喜马拉雅儿童模块 的数据 封装自 喜马拉雅 Android SDK ，其他的数据来自于阿里云OSS_SDK(私人搜集的数据)

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


4,
查看 console 打印的log：   adb logcat *:S ReactNative:V ReactNativeJS:V

模拟menu按键： adb shell input keyevent  82

模拟近期任务按键： adb shell input keyevent KEYCODE_APP_SWITCH








