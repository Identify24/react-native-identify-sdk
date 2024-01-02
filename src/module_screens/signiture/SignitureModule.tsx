import { View } from "react-native";
import React, { useRef } from "react";

import Signature, { type SignatureViewRef } from "react-native-signature-canvas";
export interface SignitureInterface {
    screenHeight: number;
}

export const SignitureModule: React.FC<SignitureInterface> = ({ screenHeight }) => {


    const ref = useRef<SignatureViewRef>(null);
    return (
        <View style={{ height: screenHeight }}>
            <Signature
                ref={ref}
                backgroundColor="rgb(255,255,255)"
                onOK={(img) => console.log(img)}
                onEnd={() => ref.current?.readSignature()}
                descriptionText="Sign"
                clearText="Clear"
                confirmText="Save"
                imageType="image/png"
            />
        </View>


    );
};