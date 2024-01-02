import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { Camera, type CameraPermissionStatus } from 'react-native-vision-camera';
import type { NavigateProp } from '../module_interfaces/IdentifyOptions';

export const PermissionsPage: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined');
    const [microphonePermissionStatus, setMicrophonePermissionStatus] = useState<CameraPermissionStatus>('not-determined');


    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermissionStatus)
        Camera.getMicrophonePermissionStatus().then(setMicrophonePermissionStatus)
    }, [])
    const requestMicrophonePermission = useCallback(async () => {
        console.log('Requesting microphone permission...')
        const permission = await Camera.requestMicrophonePermission()
        console.log(`Microphone permission status: ${permission}`)

        if (permission === 'denied') await Linking.openSettings()
        setMicrophonePermissionStatus(permission)
    }, [])

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...')
        const permission = await Camera.requestCameraPermission()
        console.log(`Camera permission status: ${permission}`)

        if (permission === 'denied') await Linking.openSettings()
        setCameraPermissionStatus(permission)
    }, [])


    useEffect(() => {
        requestCameraPermission()
        requestMicrophonePermission()
    }, [cameraPermissionStatus, microphonePermissionStatus, navigation])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Camera Permission: {cameraPermissionStatus}</Text>
            <Button title="Request Camera Permission" onPress={requestCameraPermission} />

            <Text>Microphone Permission: {microphonePermissionStatus}</Text>
            <Button title="Request Microphone Permission" onPress={requestMicrophonePermission} />
        </View>
    );
};