
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


export  function  xy_renderItem(item) {

    // var info =  item.item.value['albumTitle'];
    //   console.log(  "renderItem: "+info  );

    var thisItemProps = {
        albumTitle: item.item.value['albumTitle'],
        albumIntro: item.item.value['albumIntro'],
        includeTrackCount: item.item.value['includeTrackCount'],
        playCount: item.item.value['playCount'],
        coverUrlMiddle: item.item.value['coverUrlMiddle'],
    };

    return (

        <StoryItem  storyData={thisItemProps}  />
    );

}

export function xy_separator() {
    return <View style={{height:10,backgroundColor: '#F5F5F5'}}/>;
}
