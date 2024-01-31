export const IdentifyModuleScreenTypes = {
    AGENT_CALL: "waitScreen",
    SPEECH_TEST: "speech",
    IDENTIFICATION_INFORMATION_WITH_NFC: "nfc",
    LIVENESS_TEST: "livenessDetection",
    IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO: "idCard",
    TAKE_SELFIE: "selfie",
    VIDEO_RECORD: "videoRecord",
    SIGNATURE: "signature",
    VALIDATE_ADDRESS: "addressConf",
}
export const IdentifyModuleTypes = {
    SELFIE_MODULE: "SelfieModuleIdentify",
    SPEECH_MODULE: "SpeechModuleIdentify",
    VIDEO_RECORD_MODULE: "VideoRecordModuleIdentify",
    NFC_READER_MODULE: "NfcReaderModuleIdentify",
    LIVENESS_DETECTION_MODULE: "LivenessDetectionModuleIdentify",
    ID_CARD_SCAN_MODULE: "IdCardScanModuleIdentify",
    AGENT_CALL: "AgentCallModuleIdentify",
    WEBRTC_MODULE: "WebRTCModuleIdentify",
    THANK_YOU_MODULE: "ThankYouModuleIdentify"

}
export const IdentifySocketSubscriptionTypes = {
    SELFIE_MODULE: "Selfie",
    SPEECH_MODULE: "Speech Recognition",
    VIDEO_RECORD_MODULE: "Video Recorder",
    NFC_READER_MODULE: "Mrz & Nfc Screen",
    LIVENESS_DETECTION_MODULE: "Liveness Detection",
    ID_CARD_SCAN_MODULE: "Id Card",
    AGENT_CALL: "Call Wait Screen",
    SIGNATURE: "Signature",
    VALIDATE_ADRESS: "Address Confirm"
}

export const IdentifyAgentCallStatusTypes = {
    CALL_EMPTY: "emptyCall",
    CALL_INIT: "initCall",
    CALL_ACCEPTED: "acceptedCall",
    CALL_MISSED: "missedCall",
    CALL_REJECTED: "rejectedCall",

}
