import { IResolvers } from 'graphql-tools';
import { DateTimeResolver } from 'graphql-scalars';
import {
    TProperty,
    TDocument,
    TParty,
    AcrisType,
    THpdJurisdictionData,
    ViolationCurrentStatus,
} from '../reducers/types';
import {
    Property,
    Party,
    HousingMaintenanceCodeViolation,
    Document,
    HpdJurisdictionData,
    RegistrationContacts,
} from '../connectors/connectors';
import { Reducers } from '../reducers/reducers';
import { Borough } from '../reducers/constants';

const maybeReduceFirst = (
    list: Array<object>,
    reducer: (obj: object) => AcrisType
) => (list.length > 0 ? reducer(list[0]) : {});

export const resolvers: IResolvers = {
    Query: {
        property: async (
            _: any,
            { streetNumber, streetName, boroughBlockLot }
        ) => {
            const properties = await Property.getProperty({
                streetNumber,
                streetName,
                ...boroughBlockLot,
            });

            return properties.map(Reducers.reduceProperty);
        },

        document: async (_: any, { documentId }) => {
            const document = await Document.getDocumentById(documentId);
            return maybeReduceFirst(document, Reducers.reduceDocument);
        },

        parties: async (_: any, { name, address }) => {
            const parties = await Party.getParties({
                name,
                address,
            });
            return parties.map(Reducers.reduceParty);
        },

        housingMaintenanceCodeViolations: async (_: any, args) => {
            const violations = await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                args
            );

            return violations.map(
                Reducers.reduceHousingMaintenanceCodeViolation
            );
        },
    },

    Property: {
        registrationId: async (property: TProperty) => {
            const jurisdictionData = await HpdJurisdictionData.getHpdJurisdictionData(
                property
            );

            return (maybeReduceFirst(
                jurisdictionData,
                Reducers.reduceHpdJurisdictionData
            ) as THpdJurisdictionData).registrationId;
        },

        propertyType: async (property: TProperty) => {
            const propertyType = await Property.getPropertyTypeData(property);
            return Reducers.reducePropertyType(propertyType);
        },

        document: async (property: TProperty) => {
            const document = await Document.getDocumentById(
                property.documentId
            );
            return maybeReduceFirst(document, Reducers.reduceDocument);
        },

        housingMaintenanceCodeViolations: async (property: TProperty, args) => {
            const violations = await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                { ...property, ...args }
            );
            return violations.map(
                Reducers.reduceHousingMaintenanceCodeViolation
            );
        },

        hpdJurisdictionData: async (property: TProperty) => {
            const jurisdictionData = await HpdJurisdictionData.getHpdJurisdictionData(
                property
            );

            return maybeReduceFirst(
                jurisdictionData,
                Reducers.reduceHpdJurisdictionData
            );
        },
    },

    Document: {
        parties: async (document: TDocument, { name, address }) => {
            const parties = await Party.getParties({
                documentId: document.id,
                name,
                address,
            });

            return parties.map(Reducers.reduceParty);
        },
    },

    Party: {
        document: async (party: TParty) => {
            const document = await Document.getDocumentById(party.documentId);
            return maybeReduceFirst(document, Reducers.reduceDocument);
        },
    },

    HpdJurisdictionData: {
        registrationContacts: async (
            hpdJurisdictionData: THpdJurisdictionData
        ) => {
            const contactsData = await RegistrationContacts.getRegistrationContacts(
                hpdJurisdictionData
            );

            return contactsData.map(Reducers.reduceRegistrationContact);
        },
    },

    DateTime: DateTimeResolver,

    Borough: {
        MANHATTAN: Borough.MANHATTAN,
        BRONX: Borough.BRONX,
        BROOKLYN: Borough.BROOKLYN,
        QUEENS: Borough.QUEENS,
        STATEN_ISLAND: Borough.STATEN_ISLAND,
    },

    ViolationCurrentStatus: {
        CERTIFICATION_POSTPONMENT_DENIED:
            ViolationCurrentStatus.CERTIFICATION_POSTPONMENT_DENIED,
        CERTIFICATION_POSTPONMENT_GRANTED:
            ViolationCurrentStatus.CERTIFICATION_POSTPONMENT_GRANTED,
        CIV14_MAILED: ViolationCurrentStatus.CIV14_MAILED,
        COMPLIED_IN_ACCESS_AREA: ViolationCurrentStatus.COMPLIED_IN_ACCESS_AREA,
        DEFECT_LETTER_ISSUED: ViolationCurrentStatus.DEFECT_LETTER_ISSUED,
        FALSE_CERTIFICATION: ViolationCurrentStatus.FALSE_CERTIFICATION,
        FIRST_NO_ACCESS_TO_RE_INSPECT_VIOLATION:
            ViolationCurrentStatus.FIRST_NO_ACCESS_TO_RE_INSPECT_VIOLATION,
        INFO_NOV_SENT_OUT: ViolationCurrentStatus.INFO_NOV_SENT_OUT,
        INVALID_CERTIFICATION: ViolationCurrentStatus.INVALID_CERTIFICATION,
        NOT_COMPLIED_WITH: ViolationCurrentStatus.NOT_COMPLIED_WITH,
        NOTICE_OF_ISSUANCE_SENT_TO_TENANT:
            ViolationCurrentStatus.NOTICE_OF_ISSUANCE_SENT_TO_TENANT,
        NOV_CERTIFIED_LATE: ViolationCurrentStatus.NOV_CERTIFIED_LATE,
        NOV_CERTIFIED_ON_TIME: ViolationCurrentStatus.NOV_CERTIFIED_ON_TIME,
        NOV_SENT_OUT: ViolationCurrentStatus.NOV_SENT_OUT,
        SECOND_NO_ACCESS_TO_RE_INSPECT_VIOLATION:
            ViolationCurrentStatus.SECOND_NO_ACCESS_TO_RE_INSPECT_VIOLATION,
        VIOLATION_CLOSED: ViolationCurrentStatus.VIOLATION_CLOSED,
        VIOLATION_DISMISSED: ViolationCurrentStatus.VIOLATION_DISMISSED,
        VIOLATION_OPEN: ViolationCurrentStatus.VIOLATION_OPEN,
        VIOLATION_REOPEN: ViolationCurrentStatus.VIOLATION_REOPEN,
        VIOLATION_WILL_BE_REINSPECTED:
            ViolationCurrentStatus.VIOLATION_WILL_BE_REINSPECTED,
    },
};
