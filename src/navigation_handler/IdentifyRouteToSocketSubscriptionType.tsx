import { IdentifyModuleScreenTypes, IdentifySocketSubscriptionTypes } from "../enums/identify_module_types";

export const mapScreenTypeToSubscriptionType = (screenType: string): string => {
    switch (screenType) {
        case IdentifyModuleScreenTypes.AGENT_CALL:
            return IdentifySocketSubscriptionTypes.AGENT_CALL;
        case IdentifyModuleScreenTypes.SPEECH_TEST:
            return IdentifySocketSubscriptionTypes.SPEECH_MODULE;
        case IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_NFC:
            return IdentifySocketSubscriptionTypes.NFC_READER_MODULE;
        case IdentifyModuleScreenTypes.LIVENESS_TEST:
            return IdentifySocketSubscriptionTypes.LIVENESS_DETECTION_MODULE;
        case IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO:
            return IdentifySocketSubscriptionTypes.ID_CARD_SCAN_MODULE;
        case IdentifyModuleScreenTypes.TAKE_SELFIE:
            return IdentifySocketSubscriptionTypes.SELFIE_MODULE;
        case IdentifyModuleScreenTypes.VIDEO_RECORD:
            return IdentifySocketSubscriptionTypes.VIDEO_RECORD_MODULE;
        case IdentifyModuleScreenTypes.SIGNATURE:
            return IdentifySocketSubscriptionTypes.SIGNATURE;
        case IdentifyModuleScreenTypes.VALIDATE_ADDRESS:
            return IdentifySocketSubscriptionTypes.VALIDATE_ADRESS;
        default:
            return "";
    }
};