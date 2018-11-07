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



export default class PageVideoPlay extends Component {

    componentDidMount() {

        this.setState({ 'con':'sds'} );  //需要传输一些数据进去才会刷新
    }




    render() {

        var {params} = this.props.navigation.state;

        return (
            <View style={{flex:1}}>

                <Text  >
                    {params.data}
                </Text>

            </View>

        );
    }

}






