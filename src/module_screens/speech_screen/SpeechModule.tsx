
import { Button, View, Text } from 'react-native';
import Voice, { type SpeechEndEvent, type SpeechErrorEvent, type SpeechResultsEvent, type SpeechStartEvent } from '@react-native-community/voice';
import { useEffect, useState } from 'react';
import React from 'react';


export const SpeechModule: React.FC = () => {
    // const [recording, setRecording] = useState(false);
    const [speechText, setSpeechText] = useState("");

    function speechErrorHandler(e: SpeechErrorEvent): void {
        console.log("speechErrorHandler", e);

    }
    function speechResultHandler(e: SpeechResultsEvent): void {
        if (e.value && e.value[0]) {
            setSpeechText(e.value[0]!!)
            setTimeout(stopRecording, 1000)
        }

    }
    function speechStartHandler(e: SpeechStartEvent): void {
        console.log("speechStartHandler", e);
    }

    function speechEndHandler(e: SpeechEndEvent): void {
        console.log("speechEndHandler", e);
    }

    function startRecording() {
        try {
            Voice.start("tr-TR",);
            // setRecording(true)
        } catch (error) {
            console.log(error);

        }

    }

    function stopRecording() {
        try {
            Voice.stop();
            // setRecording(false)
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultHandler;
        Voice.onSpeechError = speechErrorHandler;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])


    return (
        <View >
            <Text>Alınan data: {speechText}</Text>
            <Button title="start" onPress={() => { startRecording() }}></Button>
            <Button title="stop" onPress={() => { stopRecording() }}></Button>
        </View>
    );
};
