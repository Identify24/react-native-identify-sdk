// RouteList.tsx

import { IdentifyModuleScreenTypes } from "../enums/identify_module_types";
import type { IdentifyScreens } from "../module_interfaces/IdentifyNavigationProps";


// Define the type for the route and the props passed to createSortedRouteList

export const createSortedRouteList = ({
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
}: IdentifyScreens) => {

    const routeList = [
        { name: IdentifyModuleScreenTypes.AGENT_CALL, component: waitScreen },
        { name: IdentifyModuleScreenTypes.SPEECH_TEST, component: speechScreen },
        { name: IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO, component: idCardScreen },
        { name: IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_NFC, component: nfcScreen },
        { name: IdentifyModuleScreenTypes.LIVENESS_TEST, component: livenessDetectionScreen },
        { name: IdentifyModuleScreenTypes.TAKE_SELFIE, component: selfieScreen },
        { name: IdentifyModuleScreenTypes.VIDEO_RECORD, component: videoRecordScreen },
        { name: IdentifyModuleScreenTypes.SIGNATURE, component: signatureScreen },
        { name: IdentifyModuleScreenTypes.VALIDATE_ADDRESS, component: addressConfScreen },
    ];

    // Filter out routes with null components
    var filteredRouteList = routeList.filter(route => route.component != null);

    // Create a mapping for screen order
    const orderIndex: { [key in any]?: number } = {};
    (screensOrder ?? []).forEach((type:string, index:number) => {
        orderIndex[type] = index;
    });

    // Sort the route list based on the order in screensOrder
    const sortedRouteList = filteredRouteList.sort(
        (a, b) => (orderIndex[a.name] ?? -1) - (orderIndex[b.name] ?? -1)
    );

    return sortedRouteList;
};
