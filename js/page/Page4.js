import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class Page4 extends Component  {
    static navigationOptions = {
        tabBarLabel: '广场',
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../images/shuxue_nor.png')}/>
            );
        },
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>4</Text>
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
        backgroundColor: 'olive',

    },
    tabBarIcon: {
        width: 90,
        height: 47,
    }
});
