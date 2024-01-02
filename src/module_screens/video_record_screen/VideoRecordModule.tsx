import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Camera, type CameraPermissionStatus, useCameraDevice } from 'react-native-vision-camera';

export const VideoRecordModule: React.FC = () => {
    // Mevcut state'ler
    // const [image, setImage] = useState<PhotoFile>();
    const device = useCameraDevice("front");
    const camera = useRef<Camera>(null);
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
    const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

    // Sayaç için yeni state'ler
    const [timer, setTimer] = useState<number>(0);
    const [isRecording, setIsRecording] = useState<boolean>(false);


    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission)
        Camera.getMicrophonePermissionStatus().then(setMicrophonePermission)
    }, [])

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }

        // Temizleme fonksiyonu
        return () => {
            clearInterval(interval);

            if (isRecording) {
                stopRecording();
            }
        };
    }, [isRecording]);

    const stopRecording = async () => {
        setIsRecording(false);
        setTimer(0);

        if (camera.current && isRecording) {
            await camera.current.stopRecording();
        }
    };

    const recordVideo = async () => {
        if (device != null && cameraPermission && camera.current != null) {
            setIsRecording(true);
            camera.current.startRecording({
                onRecordingFinished: (video) => {
                    setTimer(0);
                    console.log(video);
                    setIsRecording(false);

                },
                fileType: "mp4",
                onRecordingError: (error) => console.error(error)
            });

            // n saniye sonra kaydı durdur
            setTimeout(async () => {
                if (camera.current) {
                    setTimer(0);
                    isRecording ? await camera.current.stopRecording() : null;
                    setIsRecording(false);

                }
            }, 5000);
        }
    };

    if (device != null && cameraPermission !== "granted" && microphonePermission !== "granted") return <View />;
    return (
        <View style={styles.container}>
            <Camera ref={camera}
                style={{ flex: 1 }}
                device={device!}
                video={true}
                audio={true}
                isActive={true}
            />
            {isRecording && <Text style={styles.timerText}>{timer}</Text>}
            <Button title="Record Video" onPress={recordVideo} />
        </View>
    );
};

// Stiller
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'relative'
    },
    timerText: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'white',
        fontSize: 20,
    },
});