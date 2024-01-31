export interface BaseApiResponse<T> {
    result?: boolean;
    messages?: string[];
    data?: T;
}

// To parse this data:
//
//   import { Convert, CustomerInformationEntity } from "./file";
//
//   const customerInformationEntity = Convert.toCustomerInformationEntity(json);

export interface CustomerInformationEntity {
    created_at?:          Date;
    created_by?:          string;
    customer_id?:         string;
    customer_uid?:        string;
    form_uid?:            string;
    id?:                  string;
    identification_type?: string;
    language?:            null;
    liveness?:            number[];
    modules?:             string[];
    project_id?:          string;
    sign_language?:       string;
    status?:              string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toCustomerInformationEntity(json: string): CustomerInformationEntity {
        return JSON.parse(json);
    }

    public static customerInformationEntityToJson(value: CustomerInformationEntity): string {
        return JSON.stringify(value);
    }
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