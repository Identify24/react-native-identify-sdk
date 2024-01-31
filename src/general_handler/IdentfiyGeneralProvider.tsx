// contexts/NavigationContext.tsx
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IdentifyAgentCallStatusTypes } from '../enums/identify_module_types';
import { getBrand, getModel, getSystemVersion } from 'react-native-device-info';
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { userNetworkProviderContext } from '../network_handler/http_handler/IdentifyNetworkProvider';
import { mapScreenTypeToSubscriptionType } from '../navigation_handler/IdentifyRouteToSocketSubscriptionType';
import type { CustomerInformationEntity, GetDetailsDto } from '../network_handler/http_handler/NetworkInterfaces';
import { WebSocketMessageHandler, useIdentifyGlobalWebSocket } from '../network_handler/websocket_handler/WebSocketProvider';
import { IdentifySdkContextState, IdentifySdkProviderProps, IdentifySdkStepsStatusProps, Nav } from './GeneralProviderInterfaces';

export const IdentifySDKProvider: React.FC<IdentifySdkProviderProps> = ({ children, screensOrder, webRTCInfo }) => {
    const { getCustomerInformation } = userNetworkProviderContext();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useIdentifyGlobalWebSocket();
    const [currentIndex, setCurrentIndex] = useState(0);

    const [agentCallStatus, setAgentCallStatus] = useState(IdentifyAgentCallStatusTypes.CALL_EMPTY);
    const [socketAction, setSocketAction] = useState(IdentifyAgentCallStatusTypes.CALL_EMPTY);
    const [userDetails, setUserDetail] = useState<CustomerInformationEntity | undefined>(undefined);
    const navigation = useNavigation<Nav>();
    var newScreenOrder: string[] = [...screensOrder];
    const pageInfo = { "pageLenght": newScreenOrder.length, "currentIndex": currentIndex }
    const [navigationStepsStatus, setNavigationStepsStatus] = useState<IdentifySdkStepsStatusProps>({
        nfc: false,
        liveness: false,
        selfie: false,
        language: "TR",
        verifyAddress: false,
        speech: false,
        prepare: false,
        signature: false,
        video: false,
        idFront: false,
        idBack: false,
        sign_language: false,
    })

    function getDeviceInfo() {
        return {
            "platform": Platform.OS === "ios" ? "Apple" : "Android",
            "osVersion": getSystemVersion(),
            "deviceBrand": getBrand(),
            "deviceModel": getModel()
        };
    }



    const stepChanged = useCallback((data: CustomerInformationEntity, currentPage: string) => {
        sendMessage(JSON.stringify({
            "action": "stepChanged",
            "room": data.customer_uid,
            "location": currentPage,
            "project_id": data.project_id,
            "steps": currentPage === "Call Wait Screen" ? navigationStepsStatus : undefined
        }))



    }, [currentIndex]);

    const handleSocketEvents = (event: WebSocketMessageHandler) => {
        try {
            if (event) {
                //console.log("Socket Event Action: ", JSON.parse(JSON.stringify(event))["action"]);
                const socketActionData = JSON.parse(JSON.stringify(event))["action"];
                setSocketAction(socketActionData)

            }
        } catch (e) {
            console.log("SocketEvent", e);

        }
    }

    useEffect(() => {
        if (!userDetails) return;
        if (socketAction === "imOffline" || socketAction === "newSub") {

            setTimeout(() => {
                sendMessage(JSON.stringify({
                    "action": "imOnline",
                    "room": userDetails?.customer_uid,
                    "location": mapScreenTypeToSubscriptionType(newScreenOrder[currentIndex])
                }))
            }, 500)
        }

        else if (socketAction === IdentifyAgentCallStatusTypes.CALL_INIT) {
            setAgentCallStatus(IdentifyAgentCallStatusTypes.CALL_INIT)
        }

        else if (agentCallStatus === IdentifyAgentCallStatusTypes.CALL_INIT && socketAction === IdentifyAgentCallStatusTypes.CALL_MISSED) {
            setAgentCallStatus(IdentifyAgentCallStatusTypes.CALL_MISSED)
            setTimeout(() => setAgentCallStatus(IdentifyAgentCallStatusTypes.CALL_EMPTY), 100)
        }

    }, [socketAction]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const modules: GetDetailsDto = { modules: newScreenOrder }
                const userDetail = (await getCustomerInformation(modules)).data ?? {}
                setUserDetail(userDetail);
            } catch (error) {
                console.error("Cannot fetch user details...!!:", error);
            }
        };

        fetchData();

        return () => {
            setUserDetail(undefined);
        };
    }, []);

    useEffect(() => {
        try {
            if (userDetails) {
                sendMessage(JSON.stringify({
                    "action": "subscribe",
                    "room": userDetails.customer_uid,
                    "deviceInfo": getDeviceInfo()
                }))
            }
        }
        catch (e) {
            console.log("error", e);

        }
    }, [userDetails]);

    useEffect(() => {
        addMessageHandler(handleSocketEvents);
        return () => {
            console.log("removeMessageHandler");
            removeMessageHandler(handleSocketEvents);
        };
    }, [addMessageHandler, userDetails]);


    const goToNextPage = useCallback(() => {

        if (newScreenOrder[currentIndex + 1] && currentIndex < newScreenOrder.length - 1) {
            setCurrentIndex(currentIndex + 1);
            navigation.navigate(newScreenOrder[currentIndex + 1]!!);
            stepChanged(userDetails!!, mapScreenTypeToSubscriptionType(newScreenOrder[currentIndex + 1]))
        }
    }, [currentIndex, newScreenOrder, navigation]);

    const goToPreviousPage = useCallback(() => {

        if (newScreenOrder[currentIndex - 1] && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            navigation.navigate(newScreenOrder[currentIndex - 1]!!);

            stepChanged(userDetails!!, mapScreenTypeToSubscriptionType(newScreenOrder[currentIndex - 1]))
        }
        else if (currentIndex == 0) {
            navigation.goBack();
        }

    }, [currentIndex, newScreenOrder, navigation]);

    return (
        <IdentifySdkContext.Provider value={{ goToNextPage, goToPreviousPage, pageInfo, userDetails, agentCallStatus, setNavigationStepsStatus, socketAction, webRTCInfo }}>
            {children}
        </IdentifySdkContext.Provider>
    );
};

const IdentifySdkContext = createContext<IdentifySdkContextState | undefined>(undefined);

export const useIdentifySdkContext = () => {
    const context = useContext(IdentifySdkContext);
    if (context === undefined) {
        throw new Error('useIdentifySdkContext must be used within a IdentifySDKProvider');
    }
    return context;
};

