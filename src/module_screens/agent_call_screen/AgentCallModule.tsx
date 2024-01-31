import { Button, Text, Vibration, View } from "react-native";
import React, { useEffect } from "react";
import { NavigateProp } from "../../module_interfaces/IdentifyOptions";
import { IdentifyModuleTypes } from "../../enums/identify_module_types";

export const AgentCallModule: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const ONE_SECOND_IN_MS = 500;

    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
    ];

    useEffect(() => {
        try {
            Vibration.vibrate(PATTERN, true)
        }
        catch (e) {
            console.log("error", e);
        }
        return () => {
            Vibration.cancel()
        };
    }, []);

    return (
        <View>
            <Text>"qweqwe"</Text>
            <Button title="Start Call" onPress={() => {
                Vibration.cancel()
                navigation.navigate(IdentifyModuleTypes.WEBRTC_MODULE)
            }}></Button>
        </View>
    );
};