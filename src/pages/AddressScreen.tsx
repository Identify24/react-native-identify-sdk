import { Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIdentifySdkContext } from "../general_handler/IdentfiyNavigationProvider";
import { GeneralNavigationOption } from "../components/NavigationComponents";
import type { NavigateProp } from "../module_interfaces/IdentifyOptions";


export const AddressScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {
    const { pageInfo, goToNextPage, goToPreviousPage } = useIdentifySdkContext();
    const [text, setText] = useState('');
    useEffect(() => {
        navigation.setOptions(GeneralNavigationOption({ pageInfo, goToNextPage, goToPreviousPage }))
        console.log("123123123");

    }, [pageInfo, goToNextPage, goToPreviousPage])

    return (
        <View>
            <Text>Address Card Screen</Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="Type here to translate!"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />
        </View>
    );
};

