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
    findNodeHandle, Alert,

} from 'react-native';
import {CallbackTool, ToastShow} from "../../Model/TingModel";
import {BlurView} from 'react-native-blur';
import StoryItem from "../../Component/StoryItem";
import AudioItem from "../../Component/AudioItem";
import  BlurImageViewComponent from "../../Component/BlurComponent"
import {urlprefix} from "../../Model/OssRead";

var storyData = [];

export default class XmlyAudioList extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        var {params} = this.props.navigation.state;
        this.state = {
            id: params.data.id,
            albumTitle: "",
            albumIntro: " ",
            coverUrlLarge: params.data.cover,
            nickname: "",

        };
    }

    //将要被挂载
    componentDidMount() {

        var {params} = this.props.navigation.state;
        this.state.id = params.data.id + "";

        CallbackTool('getTracks', this.state.id, (data) => {
            var obj = JSON.parse(data);

            this.state.albumTitle = obj['albumTitle'];
            this.state.albumIntro = obj['albumIntro'];
            //   this.state.coverUrlLarge=obj['coverUrlLarge'];

            storyData = [];
            this.setState(this.state); // 刷新

            var array = obj['tracks']
            for (var index in array) {
                var story = array[index]
                console.log("\n ");
                console.log("播放id： " + story["dataId"]);
                console.log("标题：  " + story["trackTitle"]);
                console.log("主播：  " + story["announcer"]["nickname"]);
                console.log("封面：  " + story["coverUrlLarge"]);
                console.log("人物：  " + story["validCover"]);
                console.log("点赞：  " + story["favoriteCount"]);
                console.log("播放次数：  " + story["playCount"]);

                storyData.push({key: index, value: story});
            }
            this.setState(this.state);


        });
        console.log("Android  componentWillMount ...将要被挂载")
    }


    render() {

        return (
            <View style={{flex: 1}}>

                {/*毛玻璃效果*/}
                <BlurImageViewComponent
                    style={styles.imageStyle}
                    imgSource={ this.state.coverUrlLarge }
                />

                {/*<Image*/}
                    {/*source={{uri: this.state.coverUrlLarge}}*/}
                    {/*style={styles.imageStyle}*/}

                {/*/>*/}

                <Image
                    source={{uri: this.state.coverUrlLarge}}
                    style={styles.absolute}
                />

                <Text style={styles.albumTitle}>
                    {" " + this.state.albumTitle}
                </Text>

                <TouchableOpacity   // 点击后弹出对话框
                    activeOpacity={0.5}
                    onPress={this.introItemClick.bind(this)}    >

                    <Text numberOfLines={2} style={styles.albumIntro}>
                        {"简介:  " + this.state.albumIntro}

                    </Text>
                </TouchableOpacity>

                <FlatList
                    ref={(flatList) => this._flatList = flatList}

                    ItemSeparatorComponent={this._separator}  //分割线
                    renderItem={this._renderItem}   // 渲染内容
                    data={storyData}                     //  数据
                    refreshing={false}
                    onEndReachedThreshold={0}    // 当列表被滚动到距离内容多少时调用  onEndReached
                    numColumns={1}            // 多少列

                    style={styles.audiolist}
                >
                </FlatList>


            </View>
        );
    }

    //点击简介
    introItemClick() {

          alert(this.state.albumIntro +""  );

//          Alert.alert(this.state.albumIntro +""  )
    }
    _renderItem = (item) => {

        // console.log("播放id： "+   story["dataId"] );
        // console.log("标题：  " +  story["trackTitle"]   );
        // console.log("主播：  " +  story["announcer"]["nickname"]   );
        // console.log("封面：  " +  story["coverUrlLarge"]   );
        // console.log("人物：  " +  story["validCover"]   );
        // console.log("点赞：  " +  story["favoriteCount"]   );
        // console.log("播放次数：  " +  story["playCount"]   );
        //
       // console.log("当前index：  "+  item.item.key );

        var thisItemProps = {
            albumTitle: item.item.value['trackTitle'],

            albumIntro: "",

            favoriteCount: item.item.value['favoriteCount'],

            playCount: item.item.value['playCount'],

            coverUrlMiddle: item.item.value['validCover'],

            id: item.item.value['dataId'],

            all:item.item.value,

            index:item.item.key,

            alllist:storyData,

        };

        return (

            <AudioItem audioData={thisItemProps}/>
        );
    }

    _separator = () => {
        return <View style={{height: 10, backgroundColor: '#F5F5F5'}}/>;
    }


}


const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    imageStyle: {
        width: width,
        height: 130,
        resizeMode: 'stretch',
    },
    absolute: {
        width: 110,
        height: 100,
        marginTop: 80,
        marginLeft: 10,
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    albumTitle: {
        marginTop: 10,
        marginLeft: 130,
        width: width,
        fontSize: 20,
    },
    albumIntro: {
        marginTop: 30,
        width: width,
        fontSize: 15,
    },

    audiolist: {
        marginTop: 10,

    },


});





