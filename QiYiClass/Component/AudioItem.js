import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter,

} from 'react-native';
import XmlyAudiolList from "../Page/Xmly/XmlyAudioList";
import {urlprefix} from "../Model/OssRead";

// var StoryProps = {
//     albumTitle: "朵狸讲故事",
//     albumIntro: "每周一至周五更新，朵狸给你讲故事！",
//     includeTrackCount: "226",
//     playCount: "8508862",
//     coverUrlMiddle: "http://fdfs.xmcdn.com/group42/M09/DB/36/wKgJ81rUCd7ySIiUAAQCCN6rrzw177_mobile_large.jpg"
// };

export default class AudioItem extends Component {


    constructor(props) {
        super();

    }

    //将要被挂载
    componentWillMount() {

    }

    //完成挂载
    componentDidMount() {

    }

    ///渲染
    render() {
        return (

            <TouchableOpacity   // TouchableOpacity用于使视图正确响应触摸的包装器
                activeOpacity={0.5}   // 设置TouchableHighlight被按下时的不透明度,
                onPress={this.itemClick.bind(this, this.props.audioData.all
                    //    [this.props.audioData.index]
                )}
            >

                <View style={styles.itemContainer}>

                    <Image source={{uri: this.props.audioData.coverUrlMiddle}} style={styles.imageStyle}/>

                    <View>
                        <Text style={styles.itemTitle}>   {this.props.audioData.albumTitle}  </Text>

                        <View style={styles.itemPlayCount}>
                            <Text>  {'播放量: ' + this.props.audioData.playCount}  </Text>
                            <Text>  {'点赞数: ' + this.props.audioData.all['favoriteCount']}  </Text>

                        </View>

                    </View>
                </View>
            </TouchableOpacity>
        );

    }

    //点击列表点击每一行   //    [this.props.audioData.index]
    itemClick(data) {

        //  DeviceEventEmitter.emit('jump', 'AudioPlay' , data );
        DeviceEventEmitter.emit('jump', 'AudioPlay', {
            list: this.props.audioData.alllist,  //传入整个list
            index: this.props.audioData.index    //  当前选项的下标
        });

        // var itemdata= this.props.audioData.alllist[ this.props.audioData.index ];
        // console.log( " "   );
        // console.log(  '点击了 '+ JSON.stringify( itemdata["value"] ) );
        // console.log( JSON.stringify(   data  )    );
    }


    //销毁
    componentWillUnmount() {

    }

    /****************************************/

    // 在props改变时调用
    componentWillReceiveProps(nextProps) {

    }

    //是否允许更新，返回boolean
    shouldComponentUpdate(nextProps, nextState) {

        return true;
    }

    //将要更新
    componentWillUpdate(nextProps, nextState) {

    }

    //完成更新
    componentDidUpdate(prevProps, prevState) {

    }

}

/********************
 *   布局属性
 *
 *   flex:1 指定某个控件扩展以充满所有剩余空间。如果多个并列的子组件都是flex：1，这些子组件平分父容器中剩余空间
 *
 *   flexDirection: row  主轴水平排列
 *
 * ***********************************/

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        width: width,
        height: 70,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
    },

    itemPlayCount: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 1,
    },

    itemTitle: {
        color: 'blue',
        fontSize: 17,
    },

    imageStyle: {
        width: 60,
        height: 50,
        marginLeft: 10,
        resizeMode: 'stretch',
    }

});


