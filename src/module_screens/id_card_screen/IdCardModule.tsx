import React, { useState } from 'react';
import { View, Text, Button, Image, SafeAreaView } from 'react-native';
import { openEdgeDetector } from 'react-native-edge-detector';
import { processImage, type IdBackData, type IdFrontData, type IdentOcrTypes } from 'react-native-identify-ocr';



export const IdCardScan: React.FC = () => {


    const [resultIdBack, setIdBackResult] = React.useState<IdBackData | undefined>();
    const [resultIdFront, setIdFrontResult] = React.useState<IdFrontData | undefined>();


    const [frontImage, setFrontImage] = useState<string>();
    const [backImage, setBackImage] = useState<string>();


    const getData = async (base64Data: string, idType: IdentOcrTypes) => {
        const data: any = await processImage(base64Data, idType);
        console.log("detaaaaa",data);
        
        setIdBackResult(data)
    }
    const openDetector = async (idType: IdentOcrTypes) => {
        const base64Data = await openEdgeDetector(
            "Scanning",
            "Crop",
            "Black White",
            "Reset"
        );

        if (base64Data) {
            getData(base64Data, idType)
        }
    };

    const renderFront = () => (
        <View key={"renderFront"}>
            <Text>Front Text</Text>
            {frontImage && <Image source={{ uri: "data:image/png;base64," + frontImage }} style={{ width: 300, height: 200 }} />}
            <Button title="Front Button" onPress={() => openDetector("FrontId")} />
        </View>
    );

    const renderBack = () => (
        <View key={"renderBack"}>
            <Text>Back Text</Text>
            {backImage && <Image source={{ uri: "data:image/png;base64," + backImage }} style={{ width: 300, height: 200 }} />}
            <Button title="Back Button" onPress={() => openDetector("BackId")} />
        </View>
    );

    return (
        <SafeAreaView>
            <View>
                {[renderFront(), renderBack()]}
            </View>
        </SafeAreaView>
    );
};
