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
    requireNativeComponent,

} from 'react-native';
 




let BlurImageView = requireNativeComponent('BlurImageView', BlurImageViewComponent);


class BlurImageViewComponent extends Component {

    render() {
        return <BlurImageView  {...this.props}/>
    }
}


module.exports = BlurImageViewComponent;



