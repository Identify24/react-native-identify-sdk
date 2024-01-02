/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Button } from 'react-native';
import {
    Camera,
    runAtTargetFps,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
} from 'react-native-vision-camera';


// import {
//     detectFace,
   
// } from 'vision-camera-face-detector-plugin';

const CAMERA_SIZE = 250;

export const LivenessDetection: React.FC = () => {


    const [detectorStatus, setDetectorStatus] = useState<string>();
    const id = (Date.now() * 1000).toString();
    const device = useCameraDevice('front');
    const { hasPermission, requestPermission } = useCameraPermission();


    const startFaceDetector = useCallback(() => {
        setDetectorStatus("startFaceDetector");
    }, [detectorStatus]);

    const stopFaceDetector = useCallback(() => {
        setDetectorStatus("closeFaceDetector");
    }, [detectorStatus]);



    const frameProcessor = useFrameProcessor(
        (frame) => {
            'worklet';

            runAtTargetFps(10, () => {
                'worklet'
                // const response = detectFace(frame, detectorStatus, id);

                console.log(frame);

            })
        },
        [detectorStatus, id]
    );

    useEffect(() => {
        if (!hasPermission) {
            requestPermission();
        }
    }, []);

    const renderCamera = useCallback(() => {
        if (device == null || !hasPermission) {
            return <Text>No camera device</Text>;
        }

        return (
            <Camera
                device={device}
                isActive
                style={styles.camera}
                frameProcessor={frameProcessor}
                //ML Kit use YUV format
                pixelFormat="yuv"
            />
        );
    }, [device, hasPermission, frameProcessor]);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraContainer}>{renderCamera()}</View>
            <Button title='Start Detection' onPress={startFaceDetector}></Button>
            <Button title='Stop Detection' onPress={stopFaceDetector}></Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cameraContainer: {
        width: 450,
        height: 500,
        borderRadius: CAMERA_SIZE / 2,
        marginVertical: 24,
    },

    camera: {
        flex: 1,
    },
});
