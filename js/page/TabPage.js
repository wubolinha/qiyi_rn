
import React from 'react';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation';
import Page1 from  './Page1';
import Page2 from  './Page2';
import Page3 from  './Page3';
import Page4 from  './Page4';


export  const TabNav  = createMaterialTopTabNavigator (
    {
        Page_1: {
            screen: Page1,
        },

        Page_2: {
            screen: Page2,
        },

        Page_3: {
            screen: Page3,
        },

        Page_4: {
            screen: Page4,
        }

    },

    {
        tabBarOptions: {

            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: '#4BC1D2',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#000',
            //是否显示tab bar的图标，默认是false
            showIcon: true,
            //showLabel - 是否显示tab bar的文本，默认是true
            showLabel: true,
            //是否将文本转换为大小，默认是true
            upperCaseLabel: false,
            //material design中的波纹颜色(仅支持Android >= 5.0)
            pressColor: '#788493',
            //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
            pressOpacity: 0.8,
            //tab bar的样式
            style: {
                backgroundColor: 'transparent',
                paddingBottom: 0,
                paddingTop:0,
                borderTopColor: 'transparent',

                left: 0,
                right: 0,
                bottom: 0,

            },
            indicatorStyle: {
                height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            },
            tabStyle: {

                height: 48
            },
            iconStyle: {

                width:100,
                height:48,
                padding:0       //Padding 0 here
            },

            //tab bar的文本样式
            labelStyle: {
                alignSelf:'center',
                fontSize: 15,

            },
            //tab 页指示符的样式 (tab页下面的一条线).
            indicatorStyle: {height: 0},
        },
        //tab bar的位置, 可选值： 'top' or 'bottom'
        tabBarPosition: 'bottom',
        //是否允许滑动切换tab页
        swipeEnabled: true,
        //是否在切换tab页时使用动画
        animationEnabled: true,
        //是否懒加载
        lazy: true,
        //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
        backBehavior: 'none',


    }

);

