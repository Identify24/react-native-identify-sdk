/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Text, View } from 'react-native';
import {IdentifyComponent} from 'react-native-identify-sdk';
import { IdentifyModuleScreenTypes } from 'react-native-identify-sdk';
import { IdentifyNetworkOptions, IdentifyOptions } from 'react-native-identify-sdk';
import { AddressScreen } from 'react-native-identify-sdk';
import { IdCardScreen } from 'react-native-identify-sdk';
import { LivenessScreen } from 'react-native-identify-sdk';
import { NfcScreen } from 'react-native-identify-sdk';
import { SelfieScreen } from 'react-native-identify-sdk';
import { SignitureScreen } from 'react-native-identify-sdk';
import { SpeechScreen } from 'react-native-identify-sdk';
import { VideoRecordScreen } from 'react-native-identify-sdk';
import { WaitScreen } from 'react-native-identify-sdk';
import { Camera } from 'react-native-vision-camera';
import { PermissionsPage } from 'react-native-identify-sdk';
import { IdentifyScreens } from 'react-native-identify-sdk/lib/typescript/src/module_interfaces/IdentifyNavigationProps';
import RNScreens from 'react-native-screens';

RNScreens.enableScreens()
const ProfileStack = createStackNavigator()



function SettingsScreen({ navigation }: any) {
  return <View style={{ height: 500 }}>
    <Text>
      "SettingsScreen"
    </Text>

    <Button title="Permission" onPress={async () => {

      const cameraPermission = await Camera.getCameraPermissionStatus()
      const microphonePermission = await Camera.getMicrophonePermissionStatus()
      if (cameraPermission === "granted" && microphonePermission === "granted") { navigation.navigate("Profile") }
      else {
        navigation.navigate("PermissionScreenIdentify")
      }
    }}></Button>
  </View>
}




function IdentifySdkScreen() {
  const screensOrder = [
    IdentifyModuleScreenTypes.TAKE_SELFIE,
    IdentifyModuleScreenTypes.AGENT_CALL,
    IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_NFC,
    IdentifyModuleScreenTypes.IDENTIFICATION_INFORMATION_WITH_CARD_PHOTO,
    IdentifyModuleScreenTypes.LIVENESS_TEST,
    IdentifyModuleScreenTypes.SPEECH_TEST,
    IdentifyModuleScreenTypes.VIDEO_RECORD,
  
    IdentifyModuleScreenTypes.SIGNATURE,
    IdentifyModuleScreenTypes.VALIDATE_ADDRESS,
  ]


  const identifyScreens: IdentifyScreens = {
    waitScreen: WaitScreen,
    nfcScreen: NfcScreen,
    idCardScreen: IdCardScreen,
    speechScreen: SpeechScreen,
    livenessDetectionScreen: LivenessScreen,
    selfieScreen: SelfieScreen,
    videoRecordScreen: VideoRecordScreen,
    signatureScreen: SignitureScreen,
    addressConfScreen: AddressScreen,
    //if you want I can use custom modules
    customModuleList: undefined
  }

  const identifyOptions: IdentifyOptions = {
    identId: "",
    language: "tr",
    screensOrder: screensOrder,
    screens: identifyScreens
  };

  const networkOptions: IdentifyNetworkOptions = {
    baseUrl: '',
    socketUrl: '',
    socketPort: '',
    stun: '',
    stunPort: '',
    turn: '',
    turnPort: '',
    turnUsername: '',
    turnPassword: '',
  }

  return (
    <IdentifyComponent
      options={identifyOptions}
      stack={ProfileStack}
      network={networkOptions}
    />
  );
}


function App(): JSX.Element {

  const RootStack = createStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Settings" >
        <RootStack.Screen name="Settings" component={SettingsScreen} />
        <RootStack.Screen name="Profile" options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
          component={IdentifySdkScreen} />
        <RootStack.Screen name="PermissionScreenIdentify" component={PermissionsPage} />
      </RootStack.Navigator>
    </NavigationContainer>

  );
}

export default App;
