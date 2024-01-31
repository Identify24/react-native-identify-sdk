import { Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIdentifySdkContext } from "../general_handler/IdentfiyGeneralProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";
import { IdentifyModuleTypes } from "../enums/identify_module_types";


export const LivenessScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })

    return (
        <View>
            <Text>Liveness Screen</Text>
            <Button title="Open Liveness" onPress={async () => {
                navigation.navigate(IdentifyModuleTypes.LIVENESS_DETECTION_MODULE)
            }}></Button>

        </View>
    );
};