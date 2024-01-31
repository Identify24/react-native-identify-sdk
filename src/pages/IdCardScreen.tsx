import { Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIdentifySdkContext } from "../general_handler/IdentfiyGeneralProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";
import { IdentifyModuleTypes } from "../enums/identify_module_types";


export const IdCardScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })

    return (
        <View>
            <Text>Id Card Screen</Text>
            <Button title="readNfc" onPress={async () => { navigation.navigate(IdentifyModuleTypes.ID_CARD_SCAN_MODULE) }}></Button>


        </View>
    );
};