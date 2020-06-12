import { IResolvers } from 'graphql-tools';
import { reduceProperty, reducePropertyType } from '../reducers/property';
import { reduceDocument } from '../reducers/document';
import { TProperty, TDocument, TParty, AcrisType } from '../reducers/types';
import { reduceParty } from '../reducers/party';
import { reduceHousingMaintenanceCodeViolation } from '../reducers/housingMaintenanceCodeViolation';
import {
    Property,
    Party,
    HousingMaintenanceCodeViolation,
    Document,
} from '../connectors/acris/acrisConnectors';

const maybeReduceFirst = (
    list: Array<object>,
    reducer: (obj: object) => AcrisType
) => (list.length > 0 ? reducer(list[0]) : {});

export const resolvers: IResolvers = {
    Query: {
        property: async (
            _: any,
            { streetNumber, streetName, borough, block, lot }
        ) => {
            const properties = await Property.getProperty({
                streetNumber,
                streetName,
                borough,
                block,
                lot,
            });

            return properties.map(reduceProperty);
        },

        document: async (_: any, { documentId }) => {
            const document = await Document.getDocumentById(documentId);
            return maybeReduceFirst(document, reduceDocument);
        },

        parties: async (
            _: any,
            { name, addressLineOne, addressLineTwo, city, state, zipCode }
        ) => {
            const parties = await Party.getParties({
                name,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                zipCode,
            });
            return parties.map(reduceParty);
        },

        housingMaintenanceCodeViolations: async (
            _: any,
            { borough, block, lot }
        ) => {
            const violations = await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                { borough, block, lot }
            );
            return violations.map(reduceHousingMaintenanceCodeViolation);
        },
    },

    Property: {
        propertyType: async (property: TProperty) => {
            const propertyType = await Property.getPropertyTypeData(property);
            return reducePropertyType(propertyType);
        },

        document: async (property: TProperty) => {
            const document = await Document.getDocumentById(
                property.documentId
            );
            return maybeReduceFirst(document, reduceDocument);
        },

        housingMaintenanceCodeViolations: async (property: TProperty) => {
            const violations = await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                property
            );
            return violations.map(reduceHousingMaintenanceCodeViolation);
        },
    },

    Document: {
        parties: async (
            document: TDocument,
            { name, addressLineOne, addressLineTwo, city, state, zipCode }
        ) => {
            const parties = await Party.getParties({
                documentId: document.id,
                name,
                addressLineOne,
                addressLineTwo,
                city,
                state,
                zipCode,
            });
            return parties.map(reduceParty);
        },
    },

    Party: {
        document: async (party: TParty) => {
            const document = await Document.getDocumentById(party.documentId);
            return maybeReduceFirst(document, reduceDocument);
        },
    },
};
