import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Button,
    FlatList,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter,
    findNodeHandle,
} from 'react-native';


export const constants = {
    list: ' ',
    index: ' ',
};


var icon_to_next = '../../../images/xmly/notify_btn_next_pressed.png'
var icon_to_prev = '../../../images/xmly/notify_btn_prev_pressed.png'

export default class XmlyAudioPlay extends Component {

    constructor(props) {
        super();
        this.state = {
            title: "",
            cover: "123",
            introduce: "",
        }
    }

    // 挂载
    componentDidMount() {
        var {params} = this.props.navigation.state;
        constants.list = params.data.list
        constants.index = params.data.index
        this.getdata("")
    }

    getdata(tag) {
        switch (tag) {
            case "-":
                constants.index--
                break
            case "+":
                constants.index++
                break
        }
        if (constants.index >= constants.list.length) {
            constants.index = constants.list.length - 1
        }
        if (constants.index < 0) {
            constants.index = 0
        }

        var item = constants.list[constants.index]
        var itemvalue = item["value"]
        console.log("XmlyAudioPlay :  " + JSON.stringify(itemvalue))
        this.state = {
            title: itemvalue['trackTitle'],
            cover: itemvalue['validCover'],
            introduce: itemvalue['trackIntro'],

        }
        this.setState(this.state);
    }


    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.state.title}
                </Text>
                <Image source={{uri: this.state.cover}} style={styles.imageStyle}/>

                <View style={styles.playstyle}>
                    <Button title="上一首" onPress={this.onButtonPress.bind(this, "上一首")}
                            style={styles.playbtn_style}/>

                    <Text  >{"     "}</Text>

                    <Button title="下一首" onPress={this.onButtonPress.bind(this, "下一首")}
                            style={styles.playbtn_style}/>
                </View>

                <Text style={styles.introduce}>
                    {this.state.introduce}
                </Text>
            </View>
        )
    }

    onButtonPress(title) {
        switch (title) {
            case "上一首":

                this.getdata("-")
                break

            case "下一首":

                this.getdata("+")
                break
        }

    }
}


const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',   //flex元素的副轴对齐方式
        marginTop: 5,
    },
    playstyle: {

        flexDirection: 'row',
        marginTop: 30,
    },
    playbtn_style: {
        width: 90,
        marginLeft: 30,
        height: 90,
        marginRight: 30,
    },

    title: {
        marginTop: 30,
        color: 'black',
        fontSize: 17,
        marginLeft: 50,
        marginRight: 50,
    },
    introduce: {
        marginTop: 30,
        color: 'black',
        marginLeft: 20,
        marginRight: 30,
    },
    imageStyle: {
        width: width * (2 / 3),
        height: width / 2,
        marginTop: 40,
        resizeMode: 'stretch',
    }

});







