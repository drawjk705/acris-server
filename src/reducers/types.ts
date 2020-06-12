import { Borough } from './constants';
export type TDocumentId = string;

export type TProperty = {
    borough: Borough;
    block: number;
    lot: number;
    streetNumber: string;
    streetName: string;
    unit: string | undefined;
    propertyType: string;
    documentId: TDocumentId;
};

export type TPropertyType = {
    recordType: string;
    propertyType: string;
    description: string;
};

export type TDocument = {
    id: TDocumentId;
    crfn: string;
    type: string;
    date: string;
    amount: string;
};

export type TParty = {
    documentId: TDocumentId;
    name: string | undefined;
    address: TAddress;
};

export type THousingMaintenanceCodeViolation = {
    apartment: string;
    story: string;
    inspectionDate: string;
    originalCertifyByDate: string;
    originalCorrectByDate: string;
    newCertifyByDate: string;
    newCorrectByDate: string;
    orderNumber: string;
    novDescription: string;
    novIssuedDate: string;
    currentStatus: string;
    communityBoard: string;
    violationStatus: string;
};

export type THpdJurisdictionData = {
    registrationId: number;
    buildingId: number;
    communityBoardId: number;
    managementProgram: string;
    numberOfLegalStories: number;
    numberOfApartments: number;
    numberOfRooms: number;
    lifecycleStage: string;
    recordStatusId: number;
    recordStatus: HpdJurisdictionRecordStatus;
};

export type TRegistrationContact = {
    type: string;
    contactDescription: string;
    corporationName: string;
    title: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
    businessAddress: TAddress;
};

export type TAddress = {
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zipCode: string;
};

export enum ViolationCurrentStatus {
    CERTIFICATION_POSTPONMENT_DENIED = 'CERTIFICATION POSTPONMENT DENIED',
    CERTIFICATION_POSTPONMENT_GRANTED = 'CERTIFICATION POSTPONMENT GRANTED',
    CIV14_MAILED = 'CIV14 MAILED',
    COMPLIED_IN_ACCESS_AREA = 'COMPLIED IN ACCESS AREA',
    DEFECT_LETTER_ISSUED = 'DEFECT LETTER ISSUED',
    FALSE_CERTIFICATION = 'FALSE CERTIFICATION',
    FIRST_NO_ACCESS_TO_RE_INSPECT_VIOLATION = 'FIRST NO ACCESS TO RE- INSPECT VIOLATION',
    INFO_NOV_SENT_OUT = 'INFO NOV SENT OUT',
    INVALID_CERTIFICATION = 'INVALID CERTIFICATION',
    NOT_COMPLIED_WITH = 'NOT COMPLIED WITH',
    NOTICE_OF_ISSUANCE_SENT_TO_TENANT = 'NOTICE OF ISSUANCE SENT TO TENANT',
    NOV_CERTIFIED_LATE = 'NOV CERTIFIED LATE',
    NOV_CERTIFIED_ON_TIME = 'NOV CERTIFIED ON TIME',
    NOV_SENT_OUT = 'NOV SENT OUT',
    SECOND_NO_ACCESS_TO_RE_INSPECT_VIOLATION = 'SECOND NO ACCESS TO RE-INSPECT VIOLATION',
    VIOLATION_CLOSED = 'VIOLATION CLOSED',
    VIOLATION_DISMISSED = 'VIOLATION DISMISSED',
    VIOLATION_OPEN = 'VIOLATION OPEN',
    VIOLATION_REOPEN = 'VIOLATION REOPEN',
    VIOLATION_WILL_BE_REINSPECTED = 'VIOLATION WILL BE REINSPECTED',
}

export enum ViolationStatus {
    Open = 'Open',
    Close = 'Close',
}

export enum HpdJurisdictionRecordStatus {
    Active,
    Inactive,
    Pending,
}

export type AcrisType =
    | TProperty
    | TPropertyType
    | TDocument
    | TParty
    | THousingMaintenanceCodeViolation
    | THpdJurisdictionData
    | TRegistrationContact;
