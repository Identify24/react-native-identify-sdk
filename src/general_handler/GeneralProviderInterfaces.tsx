import { ReactNode } from "react";
import { CustomerInformationEntity } from "../network_handler/http_handler/NetworkInterfaces";

export type ScreenName = string;


export interface PageInfo {
    pageLenght: number;
    currentIndex: number;
}
export type WebRTCInfo = {
    stun: string,
    stunPort: string,
    turn: string,
    turnPort: string,
    turnUsername: string,
    turnPassword: string,
}

export interface IdentifySdkContextState {
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    pageInfo: PageInfo;
    userDetails: CustomerInformationEntity | undefined;
    agentCallStatus: string;
    socketAction: string;
    setNavigationStepsStatus: (value: React.SetStateAction<IdentifySdkStepsStatusProps>) => void;
    webRTCInfo: WebRTCInfo

}
export type Nav = {
    goBack(): unknown;
    removeListener(): unknown;
    navigate: (value: string) => void;
}

export interface IdentifySdkProviderProps {
    children: ReactNode;
    screensOrder: ScreenName[];
    webRTCInfo: WebRTCInfo;
}

export interface IdentifySdkStepsStatusProps {
    nfc?: boolean;
    liveness?: boolean;
    selfie?: boolean;
    language?: string;
    verifyAddress?: boolean;
    speech?: boolean;
    prepare?: boolean;
    signature?: boolean;
    video?: boolean;
    idFront?: boolean;
    idBack?: boolean;
    sign_language?: boolean;
}

