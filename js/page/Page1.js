import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';


class Page1 extends Component {
    static navigationOptions = {

        tabBarLabel: '课堂',
        tabBarIcon: ({focused}) => {

            return (
                <Image style={styles.tabBarIcon} source={require('../../images/shuxue_nor.png')}/>
            );
        },
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>1</Text>
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
        marginBottom:40,
        width: 90,
        height: 47,
    }
});

export default  Page1;

