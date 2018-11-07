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
import {CallbackTool, ToastShow} from "../../Model/TingModel";
import {  xy_renderItem ,xy_separator} from "./PageHelp"
import StoryItem from "../../Component/StoryItem";



var name =  '科普';

export  class XmlyPage04 extends Component {

    // reavt navigation 底部的标签
    static navigationOptions = {
        tabBarLabel: name,
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../../images/shuxue_nor.png')}/>
            );
        },
    };

    //将要被挂载
    componentDidMount() {

        CallbackTool('getXmlyCategories', name, (data) => {
            var obj = JSON.parse(data);
            var array = obj['albums']
            storyData=[];
            this.setState({ 'con':'sds'} );  // 刷新

            for (var index in array) {

                var itstory =array[index]  //专辑json字符串
                //  var intro = array[index]['albumTitle']  //专辑json字符串
                storyData.push(  {key: index, value:  itstory  }  );
                //   console.log("专辑：  " + JSON.stringify(itstory)   );

            }
            console.log("专辑数目：  " + storyData.length);

            this.setState({ 'con':'sds'} );  // 刷新
        });
    }

    render() {
        console.log("render：  " +storyData.length );
        return (

            <View   style={styles.PageContainer} >

                <FlatList
                    ref={(flatList)=>this._flatList = flatList}

                    ItemSeparatorComponent={this._separator}  //分割线
                    renderItem={this._renderItem}   // 渲染内容
                    data={storyData}                     //  数据
                    refreshing={false}
                    onEndReachedThreshold={0}    // 当列表被滚动到距离内容多少时调用  onEndReached
                    numColumns ={1}            // 多少列

                >
                </FlatList>


            </View>

        );
    }


    _renderItem = (item) => {
        // var info =  item.item.value['albumTitle'];
        //   console.log(  "renderItem: "+info  );

        var thisItemProps = {
            albumTitle: item.item.value['albumTitle'],
            albumIntro: item.item.value['albumIntro'],
            includeTrackCount: item.item.value['includeTrackCount'],
            playCount: item.item.value['playCount'],
            coverUrlMiddle: item.item.value['coverUrlMiddle'],
            id:item.item.value['id'],
        };

        return (

            <StoryItem  storyData={thisItemProps}  />
        );
    }

    _separator = () => {
        return <View style={{height:10,backgroundColor: '#F5F5F5'}}/>;
    }



}


var storyData = [];
const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    PageContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',

    },



});

