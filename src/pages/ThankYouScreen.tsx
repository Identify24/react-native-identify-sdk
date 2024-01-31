import React from 'react';
import { View, Text, Button } from 'react-native';

import type { NavigateProp } from '../module_interfaces/IdentifyOptions';
import { StackActions } from '@react-navigation/native';

export const ThankYouScreen: React.FC<NavigateProp> = ({ navigation }: NavigateProp) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>"Thank You</Text>
            <Button title='Close' onPress={() => {
                navigation.dispatch(StackActions.popToTop());
                const popAction = StackActions.pop(1);
                navigation.dispatch(popAction);
            }}></Button>
        </View>
    );
};