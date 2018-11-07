import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity, DeviceEventEmitter,
} from 'react-native';
import AliyunOSS from "aliyun-oss-react-native";
import {OSSRead_jsonResolv, urlprefix} from "../Model/OssRead";
import {CachedImage} from "react-native-img-cache";

var name = '趣味';
var tag = '更多';
var sudffix_image = "JPG|jpg|png|PNG";
var sudffix_video = "mp4|MP4|FLV|flv|3gp|3GP";
var funData_video = [];
var funData_image = [];
var headurl = "https://childrenedu.oss-cn-shenzhen.aliyuncs.com/"


export class Page4 extends Component {

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

        funData_video = [];  //数组置空
        funData_image = [];

        console.log("Android  componentWillMount ...被挂载")
        // 初始化阿里云服务，获取 设置下 json 配置文件
        AliyunOSS.asyncListObjects('childrenedu', tag).then((json) => {

            for (var index  in  json) {
                // console.log( urlprefix+json[index]        )
                var name = new Array(); //定义一数组
                name = json[index].split("/"); //字符分割
                var variable1 = name[name.length - 1];
                // 字符串不为空
                if (variable1.length != 0) {

                    if (json[index].search(sudffix_video) != -1) {

                        funData_video.push({key: index, value: json[index]});
                    }
                    else if (json[index].search(sudffix_image) != -1) {
                        funData_image.push({key: index, value: json[index]});
                    }

                   // console.log(json[index])
                } else {
                    //   console.log( "|"+ variable1+"|"     + variable1.length )
                }
            }
            this.setState({'con': 'sds'});  //需要传输一些数据进去才会刷新

        }).catch((e) => {
            console.log(e)
        })


    }

    render() {

        console.log("funny page  render:  " + funData_video.length)

        return (
            <View style={{flex: 1}}>

                <FlatList
                    ref={(flatList) => this._flatList = flatList}
                    ItemSeparatorComponent={this._separator}  //分割线
                    renderItem={this._renderItem}   // 渲染内容
                    data={funData_image}                     //  数据
                    refreshing={false}
                    onEndReachedThreshold={0}    // 当列表被滚动到距离内容多少时调用  onEndReached
                    numColumns={2}            // 多少列

                >  
                </FlatList>
            </View>
        );
    }

    _renderItem = (item) => {
        var itemData = item.item.value;
        var arr=itemData.split("/");
        var title= arr[arr.length-1].split(".")[0]
        var  url =headurl + itemData;
        let picurl = {
            uri: url
        };
        console.log("funny page  url:  " + url )
        return (
            <TouchableOpacity   // TouchableOpacity用于使视图正确响应触摸的包装器
                activeOpacity={0.5}   // 设置TouchableHighlight被按下时的不透明度,
                onPress={this.itemClick.bind(this, item)}
            >
                <View style={{flex: 1}}>

                    <CachedImage source={ picurl } style={styles.videoStyle}/>
                    <Text  numberOfLines={2} style={styles.absoluteTitleStyle}>   {title} </Text>

                </View>
            </TouchableOpacity>
        );
    }

    //点击列表点击每一行
    itemClick(item) {
        var itemData = item.item.value;

        let  Length1 =itemData.lastIndexOf(".");//取到文件名开始到最后一个点的长度
        let  fileName = itemData.substring(0, Length1);//截
        let fullName=headurl+fileName+".mp4";
       // alert(' 名称为：' + fullName  );

        // this.props.navigation.navigate('videoDemo', {
        //     data: fullName
        // })
        DeviceEventEmitter.emit('jump', 'funVideoDemo',fullName);
    }

    _separator = () => {
        return <View style={{height: 10, backgroundColor: '#F5F5F5'}}/>;
    }


}


const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({

    titleStyle: {
        width: (width / 2)  ,
        fontSize: 14,
        color: 'blue',
    },

    videoStyle: {
        width: (width / 2)  ,
        height: 240,
    },

    sourceStyle: {
        marginRight: 5,
        color: 'blue',
        fontSize: 16,
        alignSelf: 'flex-end',
    },

    absoluteTitleStyle: {
        width: (width / 2)  ,
        fontSize: 14,
        color: 'white',
        position: "absolute",
        top: 200, left: 0, bottom: 0, right: 0,
    },

});


