/**
 * Sample React Native OssApp
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';
import StaticServer from 'react-native-static-server';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class AppBackup extends Component<Props> {
    render() {




        /***********************************************/
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        var icon1='../images/shuxue_nor.png'

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit AppBackup.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Image source={require(icon1 )} style={{width: 193, height: 110}} />
                <Image source={pic} style={{width: 193, height: 110}}/>



                <Blink text='I love you'/>

            </View>
        );
    }
}

/******
 *
 *  flexDirection 默认是 column （竖直排列） ，而不是  row
 *
 *
 * justifyContent： 主元素沿子轴的排列方式子：
 *    元素是应该靠近主轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：flex-start、center、flex-end、space-around以及space-between。
 *
 * alignItems：可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式
 * 子元素是应该靠近次轴的起始端还是末尾段分布呢？亦或应该均匀分布？对应的这些可选项有：flex-start、center、flex-end以及stretch。
 *
 *  flexWrap:  在容器中换行。默认是单行
 *
 *
 * 在 RN 中，   不设置宽度, 默认100%占满容器
 *
 * *********/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    fragment:{
      width: 100,


    },

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
/***********
 *
 *   展示 组件的生命 周期
 *
 * **************/
var interval;

class Blink extends Component {
    // getDefaultProps(){
    //     //This is only supported for classes created using React.createClass.
    //     // Use a static property to define defaultProps instead.
    //     console.log("Android  getDefaultProps ...初始化组件的属性")
    // }
    // 构造函数
    constructor(props) {
        super();
        this.state = {showText: true}

        interval = setInterval(() => {
            this.setState(previousState => {
                return {showText: !previousState.showText}
            });
        }, 1000);
        console.log("Android  constructor ... 构造函数")
    }
    //将要被挂载
    componentWillMount() {
        console.log("Android  componentWillMount ...将要被挂载")

    }
    ///渲染
    render() {
// 根据当前showText的值决定是否显示text内容
        let display = this.state.showText ? this.props.text : ' ';

        console.log("Android  render ...渲染")
        return (
            <Text>{display}</Text>
        );
    }
  //完成挂载
    componentDidMount() {
        console.log("Android  componentDidMount ...完成挂载")
    }
   // 在props改变时调用
    componentWillReceiveProps(nextProps)  {
        console.log("Android  componentWillReceiveProps ...在props改变时调用")
    }
    //是否允许更新，返回boolean
    shouldComponentUpdate(nextProps,nextState){
        console.log("Android  shouldComponentUpdate ...是否允许更新")
        return true;
    }
    //将要更新
    componentWillUpdate(nextProps,nextState) {
        console.log("Android  componentWillUpdate ...将要更新")
    }
    //完成更新
    componentDidUpdate(prevProps,prevState) {
        console.log("Android  componentDidUpdate ...完成更新")
    }
    //销毁
    componentWillUnmount() {
        console.log("Android  componentWillUnmount ...销毁")
        clearInterval(interval);
    }

}

