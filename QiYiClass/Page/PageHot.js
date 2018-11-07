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
import AliyunOSS from "aliyun-oss-react-native";
import {OSSRead_jsonResolv} from "../Model/OssRead";

var name = '热点';
var tag = '热点话题';
var storyData = [];

export default class PageHot extends React.Component {


    // reavt navigation 底部的标签
    static navigationOptions = {
        tabBarLabel: name,
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../images/shuxue_nor.png')}/>
            );
        },
    };


    //将要被挂载
    componentDidMount() {

        // 初始化阿里云服务，获取 热点话题 下 json 配置文件
        AliyunOSS.asyncListObjects('childrenedu', tag).then((json) => {
            storyData = [];

            OSSRead_jsonResolv(json, (result) => {
                for (var index  in  result) {
                    // console.log( "热点话题: " +index +"  "+ result[index]["title"] );
                    storyData.push({key: index, value: result[index]});
                    // storyData.push({key: index, value: result[index]["title"] });
                }
                this.setState({'con': 'sds'});  //需要传输一些数据进去才会刷新
            })


        }).catch((e) => {
            console.log(e)
        })


    }


    render() {

        console.log("pagehot render：  " + storyData.length);

        return (
            <View style={{flex: 1}}>

                <FlatList
                    ref={(flatList) => this._flatList = flatList}

                    ItemSeparatorComponent={this._separator}  //分割线
                    renderItem={this._renderItem}   // 渲染内容
                    data={storyData}                     //  数据
                    refreshing={false}
                    onEndReachedThreshold={0}    // 当列表被滚动到距离内容多少时调用  onEndReached
                    numColumns={1}            // 多少列


                >
                </FlatList>

            </View>
        );
    }


    _renderItem = (item) => {

        var itemData = item.item.value;
        console.log("热点话题: " + itemData["title"]);
        return (

            <TouchableOpacity   // TouchableOpacity用于使视图正确响应触摸的包装器
                activeOpacity={0.5}   // 设置TouchableHighlight被按下时的不透明度,
                onPress={this.itemClick.bind(this, item)}
               >
                <View style={{flex: 1}}>
                    <Text style={styles.titleStyle}>   {itemData["title"]} </Text>

                    <Text style={styles.sourceStyle}>   {"-- " + itemData["source"]} </Text>
                </View>
            </TouchableOpacity>
        );
    }

    //点击列表点击每一行
    itemClick(item) {
          var itemData = item.item.value;
          alert(' 名称为：' + itemData["title"] );

    }

    _separator = () => {
        return <View style={{height: 10, backgroundColor: '#F5F5F5'}}/>;
    }

}


const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({

    titleStyle: {

        fontSize: 20,
    },
    sourceStyle: {
        marginRight: 5,
        color: 'blue',
        fontSize: 16,
        alignSelf: 'flex-end',
    },


});

