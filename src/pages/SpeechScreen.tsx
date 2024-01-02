import { Button, Text, View } from "react-native";
import React, { useEffect } from "react";

import type { NavigateProp } from "../module_interfaces/IdentifyOptions";
import { IdentifyModuleTypes } from "../enums/identify_module_types";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import { useIdentifySdkContext } from "../general_handler/IdentfiyNavigationProvider";




export const SpeechScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();


    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })


    return (
        <View  >
            <Text>Speech Screen</Text>
            <Button title="Open Speech" onPress={() => { navigation.navigate(IdentifyModuleTypes.SPEECH_MODULE) }}></Button>
        </View >
    );
};