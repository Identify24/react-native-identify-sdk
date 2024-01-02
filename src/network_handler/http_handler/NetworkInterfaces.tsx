export interface BaseApiResponse<T> {
    result?: boolean;
    messages?: string[];
    data?: T;
}

export interface CustomerInformationEntity {
    createdAt?: string;
    createdBy?: string;
    customerId?: string;
    customerUid?: string;
    formUid?: string;
    id?: string;
    status?: string;
    webviewUrl?: string;
    language?: string;
    signLanguage?: string;
    projectId?: string;
    liveness?: number[];
    modules?: string[];
}
export interface TanEntity {
    id?: string;
}

export interface GetDetailsDto {
    modules: string[];
}

export interface TanDto {
    tid: string;
    tan: string;
}

export interface MrzDto {
    authority?: string;
    birthDate?: string;
    docType?: string;
    expireDate?: string;
    gender?: string;
    ident_id?: string;
    name?: string;
    nationality?: string;
    personalNumber?: string;
    serialNumber?: string;
    surname?: string;
    image?: string;
    address?: string;
    mrzInfo?: string;
    activeAuth?: boolean;
    passiveAuth?: boolean;
}

export interface ScannedMrzDto {
    identId?: string;
    serialNo?: string;
    expireDate?: string;
    rawData?: string;
    birthDate?: string;
}

export interface UploadImageDto {
    ident_id: string;
    image: string;
    type: string;
    address?: string;
}