// contexts/NavigationContext.tsx
import React, { createContext, useState, useContext, useCallback, type ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';


type ScreenName = string;


export interface PageInfo {
    pageLenght: number;
    currentIndex: number;
}

interface IdentifySdkContextState {
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    pageInfo: PageInfo;

}
type Nav = {
    goBack(): unknown;
    removeListener(): unknown;
    navigate: (value: string) => void;
}



const IdentifySdkContext = createContext<IdentifySdkContextState | undefined>(undefined);

interface IdentifySdkProviderProps {
    children: ReactNode;
    screensOrder: ScreenName[];
}
export const IdentifySDKProvider: React.FC<IdentifySdkProviderProps> = ({ children, screensOrder }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation<Nav>();
    var newScreenOrder: string[] = [...screensOrder];
    const pageInfo = { "pageLenght": newScreenOrder.length, "currentIndex": currentIndex }

    const goToNextPage = useCallback(() => {

        if (newScreenOrder[currentIndex + 1] && currentIndex < newScreenOrder.length - 1) {
            setCurrentIndex(currentIndex + 1);
            navigation.navigate(newScreenOrder[currentIndex + 1]!!);
        }

    }, [currentIndex, newScreenOrder, navigation]);

    const goToPreviousPage = useCallback(() => {

        if (newScreenOrder[currentIndex - 1]&&currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            navigation.navigate(newScreenOrder[currentIndex - 1]!!);
        }
        else if (currentIndex == 0) {
            navigation.goBack();
        }

    }, [currentIndex, newScreenOrder, navigation]);




    // const getUserDetail = useCallback(() => {



    // }, [])



    return (
        <IdentifySdkContext.Provider value={{ goToNextPage, goToPreviousPage, pageInfo }}>
            {children}
        </IdentifySdkContext.Provider>
    );
};

export const useIdentifySdkContext = () => {
    const context = useContext(IdentifySdkContext);
    if (context === undefined) {
        throw new Error('useIdentifySdkContext must be used within a IdentifySDKProvider');
    }
    return context;
};
