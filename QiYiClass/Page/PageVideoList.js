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
import {urlprefix} from "../Model/OssRead";
import Video from "react-native-video";
import PageVideoPlay from "./PageVideoPlay";
import VideoPlayScreen from "./VideoPlayScreen";


const {width,height}=Dimensions.get('window')
var data = [];




export default class PageVideoList extends Component {


    componentDidMount() {

        data = [];  //数组置空
        this.setState({ 'con':'sds'} );  //需要传输一些数据进去才会刷新

        var {params} = this.props.navigation.state;


        console.log("Android  componentWillMount ...被挂载")
        // 初始化阿里云服务，获取 设置下 json 配置文件
        AliyunOSS.asyncListObjects('childrenedu',  params.data.title.path).then((json) => {
            data==[];
            for(var index  in  json   ){
                // console.log( urlprefix+json[index]        )
                var name= new Array(); //定义一数组
                name=json[index].split("/"); //字符分割
                var  variable1 =name[name.length-1];

                // 字符串不为空Text
                if  ( variable1.length!=0) {
                    data.push(  {key: index, value:  json[index]  }  );
                }else {
                    console.log( "|"+ variable1+"|"     + variable1.length )
                }

            }
            this.setState({ 'con':'sds'} );  //需要传输一些数据进去才会刷新

        }).catch((e) => {
            console.log(e)
        })
    }



    render() {
        return (

                <View   style={styles.page} >

                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}

                        ItemSeparatorComponent={this._separator}  //分割线
                        renderItem={this._renderItem}   // 渲染内容
                        data={data}                     //  数据
                        refreshing={false}
                        onEndReachedThreshold={0}    // 当列表被滚动到距离内容多少时调用  onEndReached
                        numColumns ={1}            // 多少列

                    >
                    </FlatList>
                </View>

        );
      }

    _renderItem = (item) => {
        var txt =  item.item.value;
        var name= new Array(); //定义一数组
        name=txt.split("/"); //字符分割

        return (
            <TouchableOpacity   // TouchableOpacity用于使视图正确响应触摸的包装器
                activeOpacity={0.5}   // 设置TouchableHighlight被按下时的不透明度,
                onPress={this.itemClick.bind(this, item)}
            >

                <View  style={styles.cell}>

                    <Text style={styles.txt}>
                        {   name[name.length-1]     }
                    </Text>

                </View>

            </TouchableOpacity>
        );
    }

    _separator = () => {
        return <View style={{height:10,backgroundColor: '#F5F5F5'}}/>;
    }



    //点击列表点击每一行  ,  导航只能在同级下跳转
    itemClick(item) {
        //  alert(' 地址为：' + urlprefix+item.item.value );

        // this.props.navigation.navigate('PlayVideo', {
        //     data:urlprefix+item.item.value
        // })

        this.props.navigation.navigate('videoDemo', {
            data:urlprefix+item.item.value
        })


    }


}

const styles=StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',

    },

    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'gray',
    },
    content:{
        width:width,
        height:height,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:60,
        backgroundColor:'#DCDCDC',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    },

    txt: {

        width: width,
        height: 50,
        marginLeft:20,
        textAlignVertical: 'center',
        color: 'blue',
        fontSize: 15,

    }

})



