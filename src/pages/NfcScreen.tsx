import { Button, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIdentifySdkContext } from "../general_handler/IdentfiyNavigationProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";
import { IdentifyModuleTypes } from "../enums/identify_module_types";
// import NfcManager, { NfcTech } from 'react-native-nfc-manager';


export const NfcScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })


    // async function checkIsSupport() {
    //     // const support = await NfcManager.isSupported();
    //     // if (support) {

    //     //     console.log("ssuperr",);

    //     // }
    // }
    return (
        <View>

            <Text>Nfc Screen</Text>
            <Button title="readNfc" onPress={async () => {



                navigation.navigate(IdentifyModuleTypes.NFC_READER_MODULE)
            }}></Button>


        </View>
    );
};



