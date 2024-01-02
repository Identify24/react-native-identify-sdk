import React, { useEffect } from "react"
import { View, Text, Button, SafeAreaView } from "react-native"
import { useIdentifySdkContext } from "../general_handler/IdentfiyNavigationProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";


export const WaitScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View>

                <Text>Wait Screen</Text>
                <Button title="Open Camera" onPress={() => { navigation.navigate("SelfieCameraIdentify") }}></Button>

            </View>
        </SafeAreaView>
    );
};