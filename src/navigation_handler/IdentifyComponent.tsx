// IdentifyComponent.tsx
import React from 'react';

import IdentifyNavigator from './IdentifyPageNavigator';
import type { IdentifyComponentProps } from '../module_interfaces/IdentifyOptions';
import { IdentifySDKProvider } from '../general_handler/IdentfiyNavigationProvider';
import { IdentifyNetworkProvider } from '../network_handler/http_handler/IdentifyNetworkProvider';
import { IdentifyGlobalWebSocketProvider } from '../network_handler/websocket_handler/WebSocketProvider';
import { IdentifyModuleScreenTypes } from '../enums/identify_module_types';



const handleNewScreenOrder = (screensOrder: string[]) => {
    const uniqueScreensOrder = [...new Set(screensOrder)];

    const cardPhotoIndex = uniqueScreensOrder.indexOf(IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO);
    const nfcIndex = uniqueScreensOrder.indexOf(IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_NFC);

    if (cardPhotoIndex !== -1) {
        // If IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO is found, move it before IDENTIFICATION_INFORMATION_WITH_NFC
        uniqueScreensOrder.splice(cardPhotoIndex, 1); // Remove IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO
        uniqueScreensOrder.splice(nfcIndex, 0, IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO); // Insert it before IDENTIFICATION_INFORMATION_WITH_NFC
    } else if (cardPhotoIndex === -1 && nfcIndex !== -1) {
        // If IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO is not found, insert IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO before its index
        uniqueScreensOrder.splice(nfcIndex, 0, IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO);
    }
    return uniqueScreensOrder
}

const IdentifyComponent: React.FC<IdentifyComponentProps> = ({
    options,
    stack,
    network
}: IdentifyComponentProps) => {
    return (
        <IdentifySDKProvider screensOrder={handleNewScreenOrder(options.screensOrder)}>
            <IdentifyNetworkProvider baseUrl={network.baseUrl} identId={options.identId}>
                <IdentifyGlobalWebSocketProvider
                    socketUrl={network.socketUrl}
                    socketPort={network.socketPort}>
                    <IdentifyNavigator
                        stack={stack}
                        screensOrder={handleNewScreenOrder(options.screensOrder)}
                        waitScreen={options.screens.waitScreen}
                        nfcScreen={options.screens.nfcScreen}
                        idCardScreen={options.screens.idCardScreen}
                        speechScreen={options.screens.speechScreen}
                        livenessDetectionScreen={options.screens.livenessDetectionScreen}
                        selfieScreen={options.screens.selfieScreen}
                        videoRecordScreen={options.screens.videoRecordScreen}
                        signatureScreen={options.screens.signatureScreen}
                        addressConfScreen={options.screens.addressConfScreen} />
                </IdentifyGlobalWebSocketProvider>
            </IdentifyNetworkProvider>
        </IdentifySDKProvider>
    );
};

export default IdentifyComponent;
