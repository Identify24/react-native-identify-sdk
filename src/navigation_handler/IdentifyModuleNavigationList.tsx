import { IdentifyModuleTypes } from "../enums/identify_module_types";
import { AgentCallModule } from "../module_screens/agent_call_screen/AgentCallModule";
import { IdCardScan } from "../module_screens/id_card_screen/IdCardModule";
import { LivenessDetection } from "../module_screens/liveness_screen/LivenessModule";
import { NfcReader } from "../module_screens/nfc_screen/NfcModule";
import { SelfieCamera } from "../module_screens/selfie_screen/SelfieCameraModule";
import { SpeechModule } from "../module_screens/speech_screen/SpeechModule";
import { VideoRecordModule } from "../module_screens/video_record_screen/VideoRecordModule";
import { WebRTCModule } from "../module_screens/webrtc_screen/WebRtcModule";
import { ThankYouScreen } from "../pages/ThankYouScreen";

export const moduleList = [
    { name: IdentifyModuleTypes.SELFIE_MODULE, component: SelfieCamera },
    { name: IdentifyModuleTypes.SPEECH_MODULE, component: SpeechModule },
    { name: IdentifyModuleTypes.VIDEO_RECORD_MODULE, component: VideoRecordModule },
    { name: IdentifyModuleTypes.NFC_READER_MODULE, component: NfcReader },
    { name: IdentifyModuleTypes.LIVENESS_DETECTION_MODULE, component: LivenessDetection },
    { name: IdentifyModuleTypes.ID_CARD_SCAN_MODULE, component: IdCardScan },
    { name: IdentifyModuleTypes.AGENT_CALL, component: AgentCallModule },
    { name: IdentifyModuleTypes.WEBRTC_MODULE, component: WebRTCModule },
    { name: IdentifyModuleTypes.THANK_YOU_MODULE, component: ThankYouScreen },
];
