
//  常量

import {Dimensions, StyleSheet} from "react-native";

export const OSS_READ_DOING = 'OSS_READ_DOING'; //正在读取
export const OSS_READ_DONE  = 'OSS_READ_DONE';   // 读取完成
export const OSS_READ_ERROR = 'OSS_READ_ERROR' ; // 读取出错

const {width, height} = Dimensions.get('window')

//  tarbar  导航栏 样式
export const globalstyles = StyleSheet.create({

    tabImage_Nor:{
        width:90,
        height:46,

    },
    tabImage_Press:{
        width:94,
        height:48,
    },
    tabText_Nor:{
        marginTop: 25,
        color: 'black',
        fontSize: 13,
        marginLeft: width/4/3.5,
        width:90,
        height:46,
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },

    tabText_Press:{
        marginTop: 25,
        color: 'black',
        fontSize: 15,
        marginLeft: width/4/3.5,
        width:90,
        height:46,
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },

});

