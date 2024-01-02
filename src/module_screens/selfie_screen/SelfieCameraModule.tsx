import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image } from 'react-native';
import { Camera, type CameraPermissionStatus, type PhotoFile, useCameraDevice } from 'react-native-vision-camera';
import { userNetworkProviderContext } from '../../network_handler/http_handler/IdentifyNetworkProvider';
import RNFS from 'react-native-fs';
export const SelfieCamera: React.FC = () => {

    const [image, setImage] = useState<PhotoFile>();
    const device = useCameraDevice("front");
    const camera = useRef<Camera>(null)
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>()

    const { uploadImageBase64 } = userNetworkProviderContext();
    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission)
    }, [])


    const takePicture = async () => {

        if (device != null && cameraPermission) {
            const photo = await camera.current!.takePhoto()
            const base64String = await RNFS.readFile(photo.path, 'base64');
             
            
            setImage(photo);

            const data = await uploadImageBase64({
                ident_id: "325b5a230a8599aeb3f76a7b4c35106061bfeae2",
                image: base64String,
                type: "idPortrait",
            })
            console.log(data);

            // handle the captured photo as needed
        }
    };

    
    if (!device) return <View />; // or some loading indicator



    return (

        <View style={{
            width: '100%',
            height: '100%',
            position: 'relative'
        }}>
            <Camera ref={camera}
                style={{ flex: 1 }}
            
                device={device}
                photo={true}
                isActive={true}
            />

            <View style={{ //circle
                width: 300,
                height: 350,
                borderRadius: 1000, // Yarı çapı 150 olarak ayarlayın
                borderWidth: 3,
                borderColor: 'black',
                backgroundColor: 'transparent',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: [{ translateX: -150 }, { translateY: -150 }], // Genişlik ve yükseklik dikkate alınarak ayarlanır
            }} />

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

 