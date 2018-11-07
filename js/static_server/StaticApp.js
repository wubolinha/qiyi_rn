
/**
 * Sample React Native Static Server
 * https://github.com/futurepress/react-native-static-server
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    Image,
    NativeModules
} from 'react-native';

import StaticServer from 'react-native-static-server';
import RNFS from 'react-native-fs';

type Props = {};
export default class StaticServerApp extends Component<Props> {

    constructor(opts) {
        super();

        this.state = {
            origin: ''
        }
    }

    componentWillMount() {
        this.port = this.props.port || 3030;
        this.root = this.props.root || "www/";
        this.file = this.props.file || 'index.html';

        // Get HTML file from require
        let html = require('./index.html');
        let {uri} = Image.resolveAssetSource(html);

        let path = RNFS.DocumentDirectoryPath + "/" + this.root;
        let dest = path + this.file;

        // Add the directory
        RNFS.mkdir(path, { NSURLIsExcludedFromBackupKey: true });

        console.log("port:"+ this.port+"   "+"root:"+ this.root);
        console.log("uri:"+uri)
        // Fetch the file
        let added;

        if (uri.indexOf("file://") > -1) {
            // Copy file in release
            added =  RNFS.exists(dest).then((e) => {
                if (!e) {
                    return RNFS.copyFile(uri, dest);
                }
            });
        } else {
            // Download for development
            let download = RNFS.downloadFile({
                fromUrl: uri,
                toFile: dest
            });
            added = download.promise;
        }


        added.then(() => {
            // Create a StaticServer at port 3030
            this.server = new StaticServer(this.port, this.root, {localOnly: false});

            this.server.start().then((origin) => {
                console.log("origin:"+origin)
                this.setState({origin});
            });
        }).catch((err) => {
            console.error(err);
        })

    }

    componentWillUnmount() {
        if (this.server) {
            this.server.kill();
        }
    }

    render() {

        fetch('http://ip.taobao.com/service/getIpInfo.php?ip=59.108.51.32', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {//1
            console.log(response);
        }).catch((err) => {//2
            console.error(err);
        });




        if (!this.state.origin) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        }

        return (
            <WebView
                source={{uri: `${this.state.origin}/${this.file}`}}
                style={styles.webview}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    webview: {
        marginTop: 20,
        flex: 1,
    }
});
