import { Button, Image, type ImageRequireSource, Text, TouchableOpacity } from "react-native"
import type { PageInfo } from "../general_handler/IdentfiyNavigationProvider";
import React from "react";
import { COLORS } from "../example_app_stuff/constants/colors";
const BANNER_IMAGE = require('./../assets/ic_logo.png') as ImageRequireSource

export interface BackButtonInterface {
    pageInfo: PageInfo;
    goToPreviousPage: any;
}

export interface NextButtonInterface {
    pageInfo: PageInfo;
    gotoNextPage: any;
}

export const BackButton: React.FC<BackButtonInterface> = ({ pageInfo, goToPreviousPage }: BackButtonInterface) => {
    return pageInfo.currentIndex > -1
        ? <TouchableOpacity children={<Text style={{ fontSize: 17, color: COLORS.primary, paddingLeft: 19 }}>Geri</Text>} onPress={goToPreviousPage} />
        : null
}



export const NextButton: React.FC<NextButtonInterface> = ({ pageInfo, gotoNextPage }: NextButtonInterface) => {
    return pageInfo.currentIndex < pageInfo.pageLenght - 1
        ? <TouchableOpacity children={<Text style={{ fontSize: 17, color: COLORS.primary, paddingRight: 19 }}>Atla</Text>} onPress={gotoNextPage} />
        : null
}
export const SkipButton: React.FC<NextButtonInterface> = ({ pageInfo, gotoNextPage }: NextButtonInterface) => {
    return pageInfo.currentIndex < pageInfo.pageLenght - 1
        ? <Button title="Skip" onPress={gotoNextPage} />
        : null
}



export const GeneralNavigationOption = ({ pageInfo, goToNextPage, goToPreviousPage }: any) => {
    // GeneralNavigationOption'ı bileşen içerisinde tanımlayın
    const generalNavigationOption = {
        headerTitle: () => (<Image height={27} width={97} source={BANNER_IMAGE} />),
        headerBackTitle: "Geri",
        headerRight: () => (<NextButton gotoNextPage={goToNextPage} pageInfo={pageInfo} />),
        headerLeft: () => (<BackButton goToPreviousPage={goToPreviousPage} pageInfo={pageInfo} />),
        headerTitleStyle: { fontSize: 17 },
        headerTitleAlign: "center"
    }

    // Bileşenin geri kalanını render edin
    return (generalNavigationOption);
}
