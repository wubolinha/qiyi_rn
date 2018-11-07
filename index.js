import { AppRegistry } from 'react-native';

import AppBackup from "./js/AppBackup";
import StackApp from "./js/page/StackApp";
import { YellowBox } from 'react-native';
import root from  './js/redux_demo/root'
import OssApp from './js/oss_demo/ossApp'
import StaticServerApp from "./js/static_server/StaticApp";
import MainApp from "./QiYiClass/Page/MainApp";
import QieRoot from "./QiYiClass/Page/MainApp"

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
//AppRegistry.registerComponent('qile', () => AppBackup);
//AppRegistry.registerComponent('qile', () => StackApp);
//AppRegistry.registerComponent('qile', () => root);
//AppRegistry.registerComponent('qile', () => OssApp);
//AppRegistry.registerComponent('qile', () => StaticServerApp);

AppRegistry.registerComponent('qile', () => QieRoot);


