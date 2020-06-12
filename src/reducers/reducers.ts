import { BOROUGHS_BY_ID } from './constants';
import {
    TProperty,
    TPropertyType,
    TParty,
    THousingMaintenanceCodeViolation,
    TDocument,
    THpdJurisdictionData,
    TRegistrationContact,
} from './types';

export const Reducers = {
    reduceProperty: (propertyObj: any = {}): TProperty => ({
        borough: BOROUGHS_BY_ID[propertyObj.borough as number],
        block: propertyObj.block,
        lot: propertyObj.lot,
        streetNumber: propertyObj.street_number,
        streetName: propertyObj.street_name,
        unit: propertyObj.unit,
        propertyType: propertyObj.property_type,
        documentId: propertyObj.document_id,
    }),

    reducePropertyType: (propertyTypeObj: any = {}): TPropertyType => ({
        recordType: propertyTypeObj.record_type,
        propertyType: propertyTypeObj.property_type,
        description: propertyTypeObj.description,
    }),

    reduceParty: (partyObj: any = {}): TParty => ({
        documentId: partyObj.document_id,
        name: partyObj.name,
        address: {
            addressLineOne: partyObj.address_1,
            addressLineTwo: partyObj.address_2,
            city: partyObj.city,
            state: partyObj.state,
            zipCode: partyObj.zip,
        },
    }),

    reduceHousingMaintenanceCodeViolation: (
        violationObj: any = {}
    ): THousingMaintenanceCodeViolation => ({
        apartment: violationObj.apartment,
        story: violationObj.story,
        inspectionDate: violationObj.inspectiondate,
        originalCertifyByDate: violationObj.originalcertifybydate,
        originalCorrectByDate: violationObj.originalcorrectbydate,
        orderNumber: violationObj.ordernumber,
        novDescription: violationObj.novdescription,
        novIssuedDate: violationObj.novissueddate,
        currentStatus: violationObj.currentstatus,
        communityBoard: violationObj.communityboard,
        newCertifyByDate: violationObj.newcertifybydate,
        newCorrectByDate: violationObj.newcorrectbydate,
        violationStatus: violationObj.violationstatus,
    }),

    reduceDocument: (documentObj: any = {}): TDocument => ({
        id: documentObj.document_id,
        crfn: documentObj.crfn,
        type: documentObj.doc_type,
        date: documentObj.document_date,
        amount: documentObj.document_amt,
    }),

    reduceHpdJurisdictionData: (
        jurisdictionDataObj: any = {}
    ): THpdJurisdictionData => ({
        registrationId: jurisdictionDataObj.registrationid,
        buildingId: jurisdictionDataObj.buildingid,
        communityBoardId: jurisdictionDataObj.communityboard,
        managementProgram: jurisdictionDataObj.managementprogram,
        numberOfLegalStories: jurisdictionDataObj.legalstories,
        numberOfApartments: jurisdictionDataObj.legalclassa,
        numberOfRooms: jurisdictionDataObj.legalclassb,
        lifecycleStage: jurisdictionDataObj.lifecycle,
        recordStatusId: jurisdictionDataObj.recordstatusid,
        recordStatus: jurisdictionDataObj.recordstatus,
    }),

    reduceRegistrationContact: (
        contactObj: any = {}
    ): TRegistrationContact => ({
        type: contactObj.type,
        contactDescription: contactObj.contactdescription,
        corporationName: contactObj.corporationname,
        title: contactObj.title,
        firstName: contactObj.firstname,
        middleInitial: contactObj.middleinitial,
        lastName: contactObj.lastname,
        businessAddress: {
            addressLineOne: `${contactObj.businesshousenumber} ${contactObj.businessstreetname}`,
            addressLineTwo: contactObj.businessapartment
                ? `Apartment ${contactObj.businessapartmentnumber}`
                : '',
            city: contactObj.businesscity,
            state: contactObj.businessstate,
            zipCode: contactObj.businesszip,
        },
    }),
};
