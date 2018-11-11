import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Button, DeviceEventEmitter,
} from 'react-native';
import
{DrawerNavigator, DrawerItems} from 'react-navigation';
import  {TabPageNav} from "./TabPage";
import VideoPlayScreen from "./VideoPlayScreen";


class Title1 extends React.Component {
    static navigationOptions = {
        drawerLabel: '首页',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../images/yingyu_nor.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    // 处理 DeviceEventEmitter 事件     DeviceEventEmitter.emit('jump', 'PlayList',item.item);
    componentDidMount() {
        this.deEmitter = DeviceEventEmitter.addListener('jump', (page,itemData) => {
          //  alert('收到：' + page+'   '+itemData   );
            this.props.navigation.navigate(page, {
                data:itemData
            }   )
        });


    }

    componentWillUnmount() {
        this.deEmitter.remove();
    }

    render() {
        return (

            <TabPageNav/>

        )
    }


}


class Title2 extends React.Component {
    static navigationOptions = {
        drawerLabel: '帮助',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../../images/zonghetisheng_nor.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };


    render() {
        return (
            <Button
                onPress={
                    () =>
                     this.props.navigation.goBack()
                   //  this.props.navigation.navigate('Play')
                }
                title=" 点击进入 主页11 "
            />
        );
    }

}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


export const DrawerPage = DrawerNavigator(
    {

        Title1: {
            screen: Title1,
        },
        Title2: {
            screen: Title2,
        },
    },
    {
        drawerPosition: 'left', // 抽屉在左边还是右边
        labelStyle: {//标签样式
            // color : 'red',
            height: 0,
        },
        style: {  // 样式
            marginVertical: 0,
        },
    }
);
