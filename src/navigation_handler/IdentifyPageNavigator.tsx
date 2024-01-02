// NavigationSDK.tsx
import React from 'react';
import { createSortedRouteList } from './IdentifyRouteList';
import { moduleList } from './IdentifyModuleNavigationList';
import { TransitionPresets } from '@react-navigation/stack';

export const IdentifyNavigator: React.FC<IdentifyScreens> = ({
    screensOrder,
    stack,
    customModuleList,
    waitScreen,
    speechScreen,
    nfcScreen,
    livenessDetectionScreen,
    idCardScreen,
    selfieScreen,
    videoRecordScreen,
    signatureScreen,
    addressConfScreen,

}) => {
    const sortedRouteList = createSortedRouteList({
        stack,
        screensOrder,
        waitScreen,
        speechScreen,
        nfcScreen,
        livenessDetectionScreen,
        idCardScreen,
        selfieScreen,
        videoRecordScreen,
        signatureScreen,
        addressConfScreen,
    });
    console.log("sortedRouteList", sortedRouteList);

    return (
        <stack.Navigator
            screenOptions={{ ...TransitionPresets.SlideFromRightIOS}}
            detachInactiveScreens={false}>
            {sortedRouteList.map((route: { name: string; component: any; }, index: any) => (
                <stack.Screen
                    key={index}
                    name={route.name}
                    component={route.component!!}
                />
            ))}

            {(customModuleList ? customModuleList : moduleList).map((route: { name: string; component: any; }, index: any) => (
                <stack.Screen
                    key={index}
                    name={route.name}
                    component={route.component!!}
                />
            ))}
        </stack.Navigator>
    );
};

export default IdentifyNavigator;