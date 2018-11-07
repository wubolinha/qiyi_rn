
import React from 'react';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation';
import {XmlyPage01} from "./XmlyPage01";
import {XmlyPage02} from "./XmlyPage02";
import {XmlyPage03} from "./XmlyPage03";
import {XmlyPage04} from "./XmlyPage04";
import {XmlyPage05} from "./XmlyPage05";
import {XmlyPage06} from "./XmlyPage06";
import {XmlyPage07} from "./XmlyPage07";
import {XmlyPage08} from "./XmlyPage08";


export  const XmlyTabPage  = createMaterialTopTabNavigator (
    {

        xmlyp1: {
            screen: XmlyPage01,
        },
        xmlyp2: {
            screen: XmlyPage02,
        },
        xmlyp3: {
            screen: XmlyPage03,
        },
        xmlyp4: {
            screen: XmlyPage04,
        },
        xmlyp5: {
            screen: XmlyPage05,
        },
        xmlyp6: {
            screen: XmlyPage06,
        },
        xmlyp7: {
            screen: XmlyPage07,
        },
        xmlyp8: {
            screen: XmlyPage08,
        },

    },

    {
        tabBarOptions: {

            //当前选中的tab bar的文本颜色和图标颜色
            activeTintColor: '#4BC1D2',
            //当前未选中的tab bar的文本颜色和图标颜色
            inactiveTintColor: '#000',
            //是否显示tab bar的图标，默认是false
            showIcon: false,
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
                // backgroundColor: 'transparent',
                paddingBottom: 0,
                paddingTop:0,
               // borderTopColor: 'transparent',

                left: 0,
                right: 0,
                bottom: 0,

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

        },
        //tab bar的位置, 可选值： 'top' or 'bottom'
        tabBarPosition: 'top',
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

