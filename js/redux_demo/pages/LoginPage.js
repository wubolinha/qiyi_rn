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

import MainPage from './MainPage';

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Main'})
    ]
})

/***
 nextProps:
  {
	"navigation": {
		"state": {
			"routeName": "Login",
			"key": "id-1537691548028-0"
		},
		"actions": {}
	},
	"status": "登录成功",
	"isSuccess": true,
	"user": {
		"name": "zhangsan",
		"age": 24
	}
}

 * ****/
class LoginPage extends Component {
    static navigationOptions = {
        title: 'LoginPage',
    };

    shouldComponentUpdate(nextProps, nextState) {
        // 登录完成,切成功登录
        console.log('shouldComponentUpdate: '+  JSON.stringify(nextProps) );
        if (nextProps.status == '登录成功' && nextProps.isSuccess) {
            console.log(' props.navigation.dispatch ?? '  );
            this.props.navigation.dispatch(resetAction)
            return false;
        }
        return true;
    }

    render() {
        const {login} = this.props;
        return (
            <View style={styles.container}>
                <Text>状态: {this.props.status}
                </Text>
                <TouchableOpacity onPress={() => login()} style={{marginTop: 50}}>
                    <View style={styles.loginBtn}>
                        <Text>登录
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


/*******
 *     实现该页视图部分和逻辑部分关联在一起
 *     store内的 state 和 action 关联在一起
 *
 * ******/

export default connect(
    (state) => ({
        status: state.logIn.status,
        isSuccess: state.logIn.isSuccess,
        user: state.logIn.user,
    }),
    (dispatch) => (
        {
            login: () => dispatch(   loginAction.login()  ),
        })
)(LoginPage)