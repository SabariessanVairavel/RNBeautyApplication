import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { RNFetchBlob } from 'rn-fetch-blob';
import { create } from 'react-test-renderer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
    }

}); 

class CameraComponent extends Component {


    takePicture = async() => {
        if (this.camera) {
            const options = { quality : 0.5, base64 : true};
            const data = await this.camera.takePictureAsync(options);
            console.log(data.base64);
            const path = `${RNFetchBlob.fs.dirs.CacheDir}/test.png`;
            console.log('path' , path);
            try {
                RNFetchBlob.fs.writeFile(path, data.base64, 'base64');
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera ref={ ref => this.camera = ref }
                    type={ RNCamera.Constants.Type.back }               
                    flashMode={ RNCamera.Constants.FlashMode.on}
                    styles={styles.preview}
                >
                </RNCamera>
                <View style={{ flex: 0, flexDirection: "row", justifyContent: "center"}}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} styles={styles.capture}>
                        <Text style={{ fontSize: 14 }}>
                            Take Picture
                        </Text>
                    

                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

export default CameraComponent;