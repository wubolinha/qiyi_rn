
import {StackNavigator} from 'react-navigation';
import  {TabNav} from './TabPage';
import  {DrawerPage} from './DrawerPage';


const  StackApp =StackNavigator(
    {
        Drawer:{
            screen:DrawerPage,

        },
        Main:{
            screen: TabNav,
            navigationOptions: ({navigation}) => ({
                header: null
            })
        }

    },
    {
        initialRouteName: 'Drawer',   // 设置默认的页面组件，必须是上面已注册的页面组件
        headerMode: 'none'        // 返回上级页面时动画效果 float：iOS默认的效果  screen：滑动过程中，整个页面都会返回  none：无动画
    }

);

export default StackApp;