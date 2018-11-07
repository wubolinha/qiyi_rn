import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {connect} from 'react-redux'; // 引入connect函数
import *as loginAction from '../actions/loginAction';// 导入action方法
import {NavigationActions} from 'react-navigation';

import {StackActions} from 'react-navigation'


const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
})

class  MainPage extends Component {
    static navigationOptions = {
        title: 'MainPage',
    };

    logout() {
        this.props.navigation.dispatch(resetAction)
    }


    render() {
        const { user } = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>状态: {this.props.status}
                </Text>
                <TouchableOpacity onPress={() => this.logout.bind(this)   } style={{marginTop: 50}}>
                    <View style={styles.loginBtn}>
                        <Text> 退出登录
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    loginBtn: {
        borderWidth: 1,
        padding: 5,
    }
});

export default connect(

)(MainPage)