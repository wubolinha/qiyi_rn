import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    ScrollView,
    Image
} from 'react-native';
import  {XmlyTabPage} from "./XmlyTabPage";


var name =  '主页';

export  class XmlyPageMain extends Component {

    // reavt navigation 底部的标签
    static navigationOptions = {
        tabBarLabel: name,
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../../images/shuxue_nor.png')}/>
            );
        },
    };


    render() {
        return (
            <XmlyTabPage/>
        )
    }



}
