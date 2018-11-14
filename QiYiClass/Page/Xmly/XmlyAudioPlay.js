import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    DeviceEventEmitter,
    findNodeHandle,
} from 'react-native';
import * as Progress from 'react-native-progress';

import {CallbackTool, ToastShow} from "../../Model/TingModel";


export const constants = {
    list: ' ',
    index: ' ',
    albumId: '',
};

var isUnmount = false;
var icon_to_next = '../../../images/xmly/notify_btn_next_pressed.png'
var icon_to_prev = '../../../images/xmly/notify_btn_prev_pressed.png'
var playinfobj = 'undefined';
var percent = 0;
var playStatus = "播放"

var duration = 0;            // 时长
var progress = 0;             //当前进度
var albumId = 0;             // 专辑id
var index = 0;                  // 在专辑中的位置
var isCache = true;         // 是否正在缓冲

export default class XmlyAudioPlay extends Component {

    constructor(props) {
        super();
        this.state = {
            title: "",
            cover: "123",
            introduce: "",
            playinfo: "",
        }
    }

    // 挂载
    componentDidMount() {
        var {params} = this.props.navigation.state;
        constants.list = params.data.list
        constants.index = params.data.index
        constants.albumId = params.data.albumId
        this.getdata("")
        CallbackTool('xmlyinit', "");
        isUnmount = false;
        percent = 0;
        // 延时1s播放
        setTimeout(() => {
            this.startPlay(JSON.stringify(constants));  //开始播放
        }, 500);
    }

    getdata(tag) {
        switch (tag) {
            case "-":
                constants.index--
                break
            case "+":
                constants.index++
                break
        }
        if (constants.index >= constants.list.length) {
            constants.index = constants.list.length - 1
        }
        if (constants.index < 0) {
            constants.index = 0
        }

        var item = constants.list[constants.index]
        var itemvalue = item["value"]

        console.log("XmlyAudioPlay :  " + JSON.stringify(itemvalue))
        this.state = {
            title: itemvalue['trackTitle'],
            cover: itemvalue['validCover'],
            introduce: itemvalue['trackIntro'],

        }
        this.setState(this.state);
    }

    //开始播放
    startPlay(paras) {
        CallbackTool('xmlyplay', paras); //调用播放器

        // 获取播放进度回调
        DeviceEventEmitter.addListener('AudioPlayEvent', function (msg) {
            //   console.log("播放进度 :  " + JSON.stringify(msg.key))
            playinfobj = JSON.parse(msg.key); //由JSON字符串转换为JSON对象
            //toFixed 可把 Number 四舍五入为指定小数位数的数字
            percent = (parseInt(playinfobj.progress) / parseInt(playinfobj.duration)).toFixed(3);  //NaN
            if (isNaN(percent)) {
                percent = 0
            }
            this.state.playinfo = (100 * percent).toFixed(1) + " %"
            if (!isUnmount) {
                this.setState(this.state);
            }

        }.bind(this));
    }


    render() {

        if (playinfobj != 'undefined') {
            playStatus = playinfobj.playStatus;          // 播放状态:暂停，停止，播放中, 广告缓冲中
            duration = this.formatSeconds(playinfobj.duration);             // 时长
            progress = this.formatSeconds(playinfobj.progress);             //当前进度
            albumId = playinfobj.albumId;              // 专辑id
            index = playinfobj.index;                  // 在专辑中的位置
        }
        console.log("percent: " + percent + "   playStatus: " + playStatus)

        return (

            <ScrollView style={{flex: 1}}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        {this.state.title}
                    </Text>
                    <Image source={{uri: this.state.cover}} style={styles.imageStyle}/>


                    {/*<Text style={styles.playinfo}>{"" + this.state.playinfo}</Text>*/}

                    <View style={styles.progressinfo}>
                        <Text style={{width: 40,}}>{progress}</Text>
                        <Text style={{width: 40, marginLeft: 225}}>{duration}</Text>
                    </View>

                    <Progress.Bar progress={Number(percent)} width={300} indeterminate={isCache}/>

                    <View style={styles.playstyle}>
                        <Button title="上一首" onPress={this.onButtonPress.bind(this, "上一首")}
                                style={styles.playbtn_style}/>

                        <Text>{"     "}</Text>

                        <Button title={this.setPlayStatus()} onPress={this.clickPlayBt.bind(this)}
                                style={styles.playbtn_style}/>

                        <Text>{"     "}</Text>

                        <Button title="下一首" onPress={this.onButtonPress.bind(this, "下一首")}
                                style={styles.playbtn_style}/>
                    </View>


                    <Text style={styles.introduce}>
                        {this.state.introduce}
                    </Text>
                </View>
            </ScrollView>


        )
    }

    // 播放状态:暂停，停止，播放中, 广告缓冲中  playing  pause  stop    prepare
    setPlayStatus() {
        var Title = "播放"
        switch (playStatus) {
            case "playing":
                Title = "暂停"
                isCache = false
                break;
            case "pause":
                Title = "播放"
                isCache = false
                break;
            case "prepare":
                Title = "缓冲中"
                isCache = true
                break;
            case "stop":
                Title = "播放"
                isCache = false
                break;
        }
        return Title
    }

    // 点击播放按钮的处理
    clickPlayBt() {
        switch (playStatus) {
            case "playing":
                Title = "暂停"

                CallbackTool('xmlypause', ""); //调用播放器
                break;
            case "pause":
                Title = "播放"
                this.startPlay(JSON.stringify(constants));
                break;
            case "prepare":
                Title = "缓存中"

                break;
            case "stop":
                Title = "播放"

                this.startPlay(JSON.stringify(constants));
                break;
            default:
                this.startPlay(JSON.stringify(constants));
                break
        }

    }

    onButtonPress(action) {
        switch (action) {
            case "上一首":

                this.getdata("-")
                this.startPlay(JSON.stringify(constants));
                break

            case "下一首":

                this.getdata("+")
                this.startPlay(JSON.stringify(constants));
                break

        }

    }


    //销毁
    componentWillUnmount() {
        isUnmount = true
        CallbackTool('xmlystop', "");
    }

    //javascript秒数转化为时分秒
    formatSeconds(mss) {
        // var days = parseInt(mss / (1000 * 60 * 60 * 24));
        //  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = ((mss % (1000 * 60)) / 1000).toFixed(0);
        minutes = fix(minutes, 2)
        seconds = fix(seconds, 2)
        return minutes + ":" + seconds;
    }

}

function fix(num, length) {
    return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,   //控件权值
        justifyContent: 'flex-start', //主轴对其方式
        alignItems: 'center',   //flex元素的副轴对齐方式
        marginTop: 5,
    },
    playstyle: {

        flexDirection: 'row',
        marginTop: 30,
    },
    playbtn_style: {
        width: 90,
        marginLeft: 30,
        height: 90,
        marginRight: 30,
    },
    progressinfo: {
        marginTop: 40,
        flexDirection: 'row',  //方向水平
        justifyContent: 'flex-start',
        width: 300,
    },
    playinfo: {
        marginTop: 40,
        color: 'black',
        fontSize: 15,

    },
    title: {
        marginTop: 10,
        color: 'black',
        fontSize: 17,
        height: 60,
        marginLeft: 50,
        marginRight: 50,
    },
    introduce: {
        marginTop: 40,
        marginBottom: 30,
        marginLeft: 20,
        marginRight: 20,
        color: 'black',
        fontSize: 15,
    },
    imageStyle: {
        width: width * (2 / 3) + 40,
        height: width * (2 / 3),
        marginTop: 20,
        resizeMode: 'stretch',
    }

});







