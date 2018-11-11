import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    Button,
    ScrollView,
    Image, Dimensions
} from 'react-native';
import  {XmlyTabPage} from "./XmlyTabPage";
import {globalstyles} from  "../../Constances"
var name =  '主页';

var tabPic_Press='../../../images/shuxue_pre_04.png'
var tabPic_Nor='../../../images/shuxue_nor.png'

export  class XmlyPageMain extends Component {


    // reavt navigation 底部的标签
    static navigationOptions = {
        tabBarLabel: name,
        tabBarIcon: ({focused}) => {

            if(focused){
                return (
                    <View >

                        <Image  style={globalstyles.tabImage_Press}   source={require(tabPic_Press)}/>
                        <Text style={globalstyles.tabText_Press} >  { name} </Text>
                    </View>

                 );
            }
            return (
                <View >
                    <Image    style={globalstyles.tabImage_Nor}     source={require(tabPic_Nor)}/>
                    <Text    style={globalstyles.tabText_Nor} >  { name} </Text>
                </View>
             );
        },
    };

    render() {
        return (
            <XmlyTabPage/>
        )
    }
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    tabBarIcon: {
        marginBottom:40,
        width: (width/4)-5,
        height: 47,
    },


});
