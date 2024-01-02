// IdentifyOptions.tsx

import type { NavigationProp } from "@react-navigation/native";

export interface IdentifyOptions {
  identId: string;
  language: string;
  screensOrder: string[];
  screens: IdentifyScreens;
}

export interface IdentifyNetworkOptions {
  baseUrl: string;
  socketUrl: string;
  socketPort: string;
  stun: string;
  stunPort: string;
  turn: string;
  turnPort: string;
  turnUsername: string;
  turnPassword: string;
}

export interface IdentifyComponentProps {
  stack: any;
  options: IdentifyOptions;
  network: IdentifyNetworkOptions
}

export type NavigateProp = {
  navigation: NavigationProp<any>;
};
