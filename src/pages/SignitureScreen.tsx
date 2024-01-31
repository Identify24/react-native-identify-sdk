import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { useIdentifySdkContext } from "../general_handler/IdentfiyGeneralProvider";
import {  GeneralNavigationOption} from "../components/NavigationComponents";
import { SignitureModule } from "../module_screens/signiture/SignitureModule";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";


export const SignitureScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })

    return (
        <View>
            <Text>Signiture Screen</Text>
            <SignitureModule screenHeight={300}></SignitureModule>
            
        </View>
    );
};