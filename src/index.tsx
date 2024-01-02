


export { IdentifyComponent } from './navigation_handler/IdentifyComponent';
export { IdentifyModuleScreenTypes } from './enums/identify_module_types';
export type { IdentifyNetworkOptions, IdentifyOptions } from './module_interfaces/IdentifyOptions';
export { AddressScreen } from './pages/AddressScreen';
export { IdCardScreen } from './pages/IdCardScreen';
export { LivenessScreen } from './pages/LivenessScreen';
export { NfcScreen } from './pages/NfcScreen';
export { SelfieScreen } from './pages/SelfieScreen';
export { SignitureScreen } from './pages/SignitureScreen';
export { SpeechScreen } from './pages/SpeechScreen';
export { VideoRecordScreen } from './pages/VideoRecordScreen';
export { WaitScreen } from './pages/WaitScreen';
export { Camera } from 'react-native-vision-camera';
export { PermissionsPage } from './pages/PermissionScreen';

import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';



const LINKING_ERROR =
  `The package 'react-native-identify-sdk-view' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type IdentifySdkViewProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'IdentifySdkViewView';

export const IdentifySdkViewView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<IdentifySdkViewProps>(ComponentName)
    : () => {
      throw new Error(LINKING_ERROR);
    };
