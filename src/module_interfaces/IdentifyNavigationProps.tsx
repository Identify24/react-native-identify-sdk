

interface IdentifyScreens {

    screensOrder?: string[];
    stack?: any;
    customModuleList?: {
        name: string;
        component: React.FC<{}>;
    }[];
    waitScreen?: React.ComponentType<any>;
    speechScreen?: React.ComponentType<any>;
    nfcScreen?: React.ComponentType<any>;
    livenessDetectionScreen?: React.ComponentType<any>;
    idCardScreen?: React.ComponentType<any>;
    selfieScreen?: React.ComponentType<any>;
    videoRecordScreen?: React.ComponentType<any>;
    signatureScreen?: React.ComponentType<any>;
    addressConfScreen?: React.ComponentType<any>;

}