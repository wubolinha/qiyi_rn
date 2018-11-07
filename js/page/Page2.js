import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class Page2 extends Component  {
    static navigationOptions = {
        tabBarLabel: '音乐厅',
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../images/shuxue_nor.png')}/>
            );
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>2</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver',
    },
    tabBarIcon: {
        width: 90,
        height: 47,
    }
});

