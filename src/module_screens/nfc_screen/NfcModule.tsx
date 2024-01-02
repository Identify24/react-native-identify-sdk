
import * as React from 'react';
// import { useState } from 'react';

import {  Button, StyleSheet, View } from 'react-native';

 



export const NfcReader: React.FC = () => {

    // const [cardInfo, setCardInfo] = useState<IDCardModel>();

    // const nfcProps: StartNFCProps = {
    //     idCardBirthDay: "971011",
    //     idCardValidDate: "300622",
    //     idCardDocNo: "A27T02194",
    //     callback: (info: IDCardModel) => {
            
    //         console.log(info);
            
    //         setCardInfo(info) }
    // };

    return (
        <View style={styles.container}>
            <Button onPress={async () => {

                // startNFC(nfcProps)
            }} title="Start sca1nning" />
            {/* <Text>{cardInfo?.name}</Text>
            <Text>{cardInfo?.surname}</Text>
            <Text>{cardInfo?.authority}</Text>
            <Text>{cardInfo?.birthdate}</Text> */}
            {/* <Image style={{ height: 400, aspectRatio: 2 / 3, borderWidth: 1, borderColor: 'red' }} source={{ uri: "data:image/png;base64," + cardInfo?.image }} /> */}
        </View>
    );
}

 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});


