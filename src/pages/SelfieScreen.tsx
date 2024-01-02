import { Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIdentifySdkContext } from "../general_handler/IdentfiyNavigationProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";
import { IdentifyModuleTypes } from "../enums/identify_module_types";


export const SelfieScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })

    return (
        <View>
            <Text>Selfie Screen</Text>
            <Button title="Open Camera" onPress={() => { navigation.navigate(IdentifyModuleTypes.SELFIE_MODULE) }}></Button>

        </View>
    );
};