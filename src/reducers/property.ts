import { BOROUGHS_BY_ID } from './constants';
import { TProperty, TPropertyType } from './types';

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
