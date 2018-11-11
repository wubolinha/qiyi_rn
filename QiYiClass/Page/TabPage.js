
import React from 'react';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation';
import {Page1}   from './PageClass';
import {Page4} from './PageFunny';
import {Page3} from './PageMusic';
import {Page2 } from './PageStory';
import PageVideoList from "./PageVideoList";
import {XmlyPageMain} from "./Xmly/XmlyPageMain";
import PageHot from "./PageHot";
import {Dimensions} from "react-native";

const {width, height} = Dimensions.get('window')
export  const TabPageNav  = createMaterialTopTabNavigator (
    {
        Page_5:{
            screen: XmlyPageMain,
        },

        // Page_1: {
        //     screen: Page1,
        // },

        // Page_2: {
        //     screen: Page2,
        // },

        Page_3: {
            screen: Page3,
        },

        Page_4: {
            screen: Page4,
        },

        Page_6:{
            screen:PageHot,
        }

    },

    {
        tabBarOptions: {
            activeTintColor: '#4BC1D2',
            inactiveTintColor: '#000',
            showIcon: true,
            showLabel: false,
            upperCaseLabel: false,

            pressOpacity: 0.8,
            style: {
                backgroundColor: '#FFEFD5',   // tarbar 背景色，透明无效
                paddingBottom: 0,
                borderTopWidth: 0.5,
                borderTopColor: '#ccc',
            },
            labelStyle: {
                fontSize: 12,
                margin: 1
            },
            tabStyle: {
                backgroundColor: '#00FF0000',   // tarbar 背景色，透明有效
                height: 48,

            },
            iconStyle: {
                backgroundColor: '#00FF0000',   // tarbar 背景色，透明有效
                width:width/4,
                height:48,

            },
            indicatorStyle: { height: 0 }, //android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
        },
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: false,
        lazy: true,
        backBehavior: 'none',
    }

);

