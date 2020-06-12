export type TDocumentId = string;

export type TProperty = {
    borough: string;
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
    CRFN: string;
    type: string;
    date: string;
    amount: string;
};

export type TParty = {
    documentId: TDocumentId;
    name: string | undefined;
    addressLineOne: string | undefined;
    addressLineTwo: string | undefined;
    city: string | undefined;
    state: string | undefined;
    zipCode: string | undefined;
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

export type AcrisType =
    | TProperty
    | TPropertyType
    | TDocument
    | TParty
    | THousingMaintenanceCodeViolation;
