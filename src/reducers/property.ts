import { BOROUGHS_BY_ID } from './constants';

export type TProperty = {
    borough: string;
    block: number;
    lot: number;
    streetNumber: string;
    streetName: string;
    unit: string | undefined;
    propertyType: string;
    documentId: string;
};
export type TPropertyType = {
    recordType: string;
    propertyType: string;
    description: string;
};
export const reduceProperty = (propertyObj: any = {}): TProperty => ({
    borough: BOROUGHS_BY_ID[propertyObj.borough as number],
    block: propertyObj.block,
    lot: propertyObj.lot,
    streetNumber: propertyObj.street_number,
    streetName: propertyObj.street_name,
    unit: propertyObj.unit,
    propertyType: propertyObj.property_type,
    documentId: propertyObj.document_id,
});

export const reducePropertyType = (
    propertyTypeObj: any = {}
): TPropertyType => ({
    recordType: propertyTypeObj.record_type,
    propertyType: propertyTypeObj.property_type,
    description: propertyTypeObj.description,
});
