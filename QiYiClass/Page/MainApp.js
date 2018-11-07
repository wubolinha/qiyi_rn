import {StackNavigator} from 'react-navigation';
import {TabPageNav} from './TabPage';
import {DrawerPage} from './DrawerPage';
import AliyunOSS from 'aliyun-oss-react-native'

import { Provider } from 'react-redux';
import configureStore from '../Store/ConfigureStore';
//import {Component} from "react";
import {
    DeviceEventEmitter
} from 'react-native';
import React, {Component} from 'react';
import PageVideoList from "./PageVideoList";
import StackApp from "../../js/page/StackApp";
import {Page1} from "./PageClass";
import PageVideoPlay from "./PageVideoPlay";
import VideoPlayScreen from "./VideoPlayScreen";
import XmlyAudioList from "./Xmly/XmlyAudioList"
import  {Page4} from  './PageFunny'
import FunnyVideoPlayScreen from "./FunnyVideoPlayScreen";

// defalut configraiton
const configuration = {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60
};
const endPoint = 'http://oss-cn-shenzhen.aliyuncs.com';
const familyserver = "http://wubolin.gz01.bdysite.com/sts.php"

//open log
AliyunOSS.enableDevMode()

// initWithServerSTS to auth
AliyunOSS.initWithServerSTS(familyserver, endPoint, configuration)



const MainApp = StackNavigator(
    {//定义路由
        AudioList:{
            screen: XmlyAudioList,
        },
        PlayList:{
            screen:PageVideoList,
        },
        PlayVideo:{
            screen:PageVideoPlay,
        },
        videoDemo:{
            screen:VideoPlayScreen,
        },
        funVideoDemo:{
            screen:FunnyVideoPlayScreen,
        },
        Drawer: {
            screen: DrawerPage,
        },

        Main: {
            screen:TabPageNav,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        },
    },
    {
        initialRouteName: 'Drawer',   // 设置默认的页面组件，必须是上面已注册的页面组件
        headerMode: 'none'        // 返回上级页面时动画效果 float：iOS默认的效果  screen：滑动过程中，整个页面都会返回  none：无动画
    }
);

//export default MainApp;


const store = configureStore();
export default class QieRoot extends Component {


    render() {
        return (
            <Provider store={store}>
                <MainApp/>
            </Provider>
        )
    }
}


