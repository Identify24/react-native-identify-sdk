import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera, type CameraPermissionStatus, type PhotoFile, useCameraDevice } from 'react-native-vision-camera';



export const AddressScreen: React.FC = () => {

    const [image, setImage] = useState<PhotoFile>();
    const device = useCameraDevice("front");
    const camera = useRef<Camera>(null)
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>()


    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission)
    }, [])


    const takePicture = async () => {
        if (device != null && cameraPermission) {
            const photo = await camera.current!.takePhoto()
            setImage(photo);
        }
    };


    if (!device && cameraPermission !== "granted") return <View />; // or some loading indicator
    return (

        <View style={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            <Camera ref={camera}
                style={{ flex: 1 }}
                device={device!}
                photo={true}
                isActive={true}
            />
            <View style={{
                width: 275, height: 40, position: 'absolute',
                bottom: '5%',
                left: '50%',
                borderRadius: 40,
                backgroundColor: "blue",
                transform: [{ translateX: -120 }, { translateY: -50 }],
            }}>
                <Button title="Take Photo" onPress={takePicture} /></View>
            {image && <Image source={{ uri: 'file://' + image.path }}
                style={{
                    width: 200, height: 300, position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: [{ translateX: -150 }, { translateY: -150 }],
                }} />}
        </View>

    );
};
