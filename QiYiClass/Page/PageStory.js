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
import {OSSRead_jsonResolv} from "../Model/OssRead";
import {CachedImage} from "react-native-img-cache";


const {width,height}=Dimensions.get('window')
var tag =  '故事';

var data = [];


export  class Page2 extends Component {

    // reavt navigation 底部的标签
    static navigationOptions = {
        tabBarLabel: tag,
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../images/shuxue_nor.png')}/>
            );
        },
    };


// 构造
    constructor(props) {
        super(props);
    }

    refreshing(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
         //   alert('刷新成功')
        },1500)


    }
    _onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
          //  alert('加载成功')
        },1500)
    }


    //将要被挂载
    componentDidMount() {
        console.log("Android  componentWillMount ...被挂载")
        data = [];  //数组置空
        this.setState({ 'con':'sds'} );  //需要传输一些数据进去才会刷新

        // 初始化阿里云服务，获取 设置下 json 配置文件
        AliyunOSS.asyncListObjects('childrenedu', '设置/').then((json) => {
            data = [];  //数组置空
            OSSRead_jsonResolv( json   ,   (result)=>{

                for(var index  in  result   ){
                    var itemType =    result[index].type;
                    if( itemType == tag){
                        console.log(   result[index] );

                        data.push(  {key: index, title:result[index]}  );
                    }
                }
                this.setState({ 'con':'sds'} );  //需要传输一些数据进去才会刷新
            })


        }).catch((e) => {
            console.log(e)
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                {/*<Button title='滚动到指定位置' onPress={()=>{*/}
                {/*this._flatList.scrollToOffset({animated: true, offset: 2000});*/}
                {/*}}/>*/}
                <View style={{flex:1}}>
                    <FlatList
                        ref={(flatList)=>this._flatList = flatList}
                        //  ListHeaderComponent={this._header}      //头部
                        //  ListFooterComponent={this._footer}      //底部
                        ItemSeparatorComponent={this._separator}  //分割线
                        renderItem={this._renderItem}   // 渲染内容
                        data={data}                     //  数据
                        onRefresh={this.refreshing}              //  下拉刷新
                        refreshing={false}
                        onEndReachedThreshold={0}    // 当列表被滚动到距离内容多少时调用  onEndReached
                        onEndReached={
                            this._onload
                        }
                        numColumns ={2}            // 多少列
                        //  columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}
                        // 如果设置了多列布局（即将numColumns值设为大于1的整数），则可以额外指定此样式作用在每行容器上
                        //horizontal={true}

                        getItemLayout={(data,index)=>(
                            {length: 100, offset: (100+2) * index, index}
                        )}
                        //     getItemLayout一个可选的优化,用于避免动态测量内容尺寸的开销,不过前提是你可以提前知道内容的高度。

                    >
                    </FlatList>
                </View>

            </View>
        );
    }


    _renderItem = (item,index) => {
        var txt =  item.item.title.describe;
        let pic = {
            uri: item.item.title.cover
        };
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.itemClick.bind(this, item, index)}>

                <View  style={styles.container}>

                    <CachedImage source={pic} style={{width: 193, height: 110}} />
                    <Text style={styles.txt}>
                        {txt}
                    </Text>

                </View>

            </TouchableOpacity>
        );
    }


    //点击列表点击每一行
    itemClick(item, index) {

        DeviceEventEmitter.emit('jump', 'PlayList',item.item);
      //  alert('点击了第' + index + '项， 名称为：' + item.item.title.describe );
    }


    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:10,backgroundColor:'white'}}/>;
    }



}


const styles=StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'olive',

    },

    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
    },
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'red',
        fontSize: 20,

    }

})