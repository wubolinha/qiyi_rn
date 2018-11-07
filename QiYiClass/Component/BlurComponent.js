

import React from 'react';
import {requireNativeComponent, View} from 'react-native';


let iface = {
    name: '  ',
    propTypes: {
        imgSource: React.PropTypes.string,
        ...View.propTypes  //支持View组件的所有属性
    }
}

/******
 *
 *   核心方法：requireNativeComponent('PhotoView', iface)
 这个方法可以接收三个参数:
 第一个参数：stirng 类型，对应我们Native中定义的那个ViewManager#getName的返回值。
 第二个参数：{name?:string,displayName?:string,propTypes:Object}类型，或者ReactClass类型
 第三个参数：{nativeOnly?:Object} 类型，用来解决 一些特殊的属性，想从原生组件中导出，但是又不希望它们成为对应React封装组件的属性
 ---------------------

 *
 *
 * ****************/
var RCTBlurView = requireNativeComponent('BlurView', iface);


export default RCTBlurView;





