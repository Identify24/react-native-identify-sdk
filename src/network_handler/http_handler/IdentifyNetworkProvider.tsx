// IdentifyGlobalContext.tsx

import type { GetDetailsDto, BaseApiResponse, CustomerInformationEntity, TanDto, TanEntity, MrzDto, ScannedMrzDto, UploadImageDto } from './NetworkInterfaces';
import React, { createContext, useContext, type FunctionComponent } from 'react';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

interface IdentifyGlobalContextProps {
    apiClient: AxiosInstance;
    getCustomerInformation: ( modules: GetDetailsDto) => Promise<BaseApiResponse<CustomerInformationEntity>>;
    setSmsCode: (tanDto: TanDto) => Promise<BaseApiResponse<TanEntity>>;
    setMrzData: (mrzDto: MrzDto) => Promise<BaseApiResponse<CustomerInformationEntity>>
    setScannedMrzData: (scannedMrzDto: ScannedMrzDto) => Promise<BaseApiResponse<CustomerInformationEntity>>
    uploadImageBase64: (uploadImageDto: UploadImageDto) => Promise<BaseApiResponse<CustomerInformationEntity>>
    uploadVideo5Sec: (identId: string, type: string, video5Sec: Blob) => Promise<BaseApiResponse<boolean>>
}



const IdentifyNetworkContext = createContext<IdentifyGlobalContextProps | undefined>(undefined);

export const IdentifyNetworkProvider: FunctionComponent<{ children: any, baseUrl: string, identId: string }> = ({ children, baseUrl, identId }) => {
    const apiClient = axios.create({ baseURL: baseUrl });

    const getCustomerInformation = async (modules: GetDetailsDto): Promise<BaseApiResponse<CustomerInformationEntity>> => {
        try {
            const response: AxiosResponse<BaseApiResponse<CustomerInformationEntity>>
                = await apiClient.post("/mobile/getIdentDetails/" + identId, modules);
            console.log(response.headers);

            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    };

    const setSmsCode = async (tanDto: TanDto): Promise<BaseApiResponse<TanEntity>> => {
        try {
            const response: AxiosResponse<BaseApiResponse<TanEntity>> = await apiClient.post('/mobile/verifyTan', tanDto);
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    };
    const setMrzData = async (mrzDto: MrzDto): Promise<BaseApiResponse<CustomerInformationEntity>> => {
        try {
            const response = await apiClient.post('/mobile/nfc_verify', mrzDto);
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    };

    const setScannedMrzData = async (scannedMrzDto: ScannedMrzDto): Promise<BaseApiResponse<CustomerInformationEntity>> => {
        try {
            const response = await apiClient.post('/mobile/mrz_info', scannedMrzDto);
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    };

    const uploadImageBase64 = async (uploadImageDto: UploadImageDto): Promise<BaseApiResponse<CustomerInformationEntity>> => {
        try {
            const response = await apiClient.post('/mobile/upload', uploadImageDto);
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    };

    const uploadVideo5Sec = async (
        identId: string,
        type: string,
        video5Sec: Blob
    ): Promise<BaseApiResponse<boolean>> => {
        const formData = new FormData();
        formData.append('ident_id', identId);
        formData.append('type', type);
        formData.append('video5Sec', video5Sec);

        try {
            const response = await apiClient.post('/mobile/uploadVideo5Sec', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('API error: ', error);
            throw error;
        }
    };
    return (
        <IdentifyNetworkContext.Provider value={{
            apiClient,
            getCustomerInformation,
            setSmsCode,
            setMrzData,
            setScannedMrzData,
            uploadImageBase64,
            uploadVideo5Sec
        }}>
            {children}
        </IdentifyNetworkContext.Provider>
    );
};

export const userNetworkProviderContext = () => {
    const context = useContext(IdentifyNetworkContext);
    if (!context) {
        throw new Error('userNetworkProviderContext must be used within an IdentifyNetworkProvider');
    }
    return context;
};
