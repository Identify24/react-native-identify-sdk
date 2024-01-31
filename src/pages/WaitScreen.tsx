import React, { useEffect, useState } from "react"
import { View, Text, Button, SafeAreaView } from "react-native"
import { useIdentifySdkContext } from "../general_handler/IdentfiyGeneralProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";
import { IdentifyAgentCallStatusTypes, IdentifyModuleTypes } from "../enums/identify_module_types";


export const WaitScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage, agentCallStatus, socketAction } = useIdentifySdkContext();

    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
    })

    useEffect(() => {
        try {
            console.log("startAgentCall123123", agentCallStatus);
            if (agentCallStatus === IdentifyAgentCallStatusTypes.CALL_INIT) {
                navigation.navigate(IdentifyModuleTypes.AGENT_CALL)
            }
            else if (socketAction !== IdentifyAgentCallStatusTypes.CALL_INIT && agentCallStatus === IdentifyAgentCallStatusTypes.CALL_MISSED) {
                navigation.goBack()
            }
            else if (agentCallStatus === IdentifyAgentCallStatusTypes.CALL_ACCEPTED) {

            }
        }
        catch (e) {
            console.log("error", e);
        }
    }, [agentCallStatus]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Wait Screen</Text>
            </View>
        </SafeAreaView>
    );
};