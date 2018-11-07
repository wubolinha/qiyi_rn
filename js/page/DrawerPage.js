import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Button,
} from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
import {TabNav} from "./TabPage";


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

    // render() {
    // return (
    //     <Button
    //         onPress={() => this.props.navigation.navigate('Notifications')}
    //         title="this is title1 , Go to title2 "
    //     />
    // );

    render() {
        return (
            <TabNav/>
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
                onPress={() => this.props.navigation.goBack()}
                 title=" 点击进入 主页  11 "



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
        labelStyle : {//标签样式
            // color : 'red',
            height : 0,
        },
        style: {  // 样式
            marginVertical: 0,
        },
    }
);
