import { IResolvers } from 'graphql-tools';
import { TProperty, TDocument, TParty, AcrisType } from '../reducers/types';
import {
    Property,
    Party,
    HousingMaintenanceCodeViolation,
    Document,
} from '../connectors/connectors';
import { Reducers } from '../reducers/reducers';

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

            return properties.map(Reducers.reduceProperty);
        },

        document: async (_: any, { documentId }) => {
            const document = await Document.getDocumentById(documentId);
            return maybeReduceFirst(document, Reducers.reduceDocument);
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
            return parties.map(Reducers.reduceParty);
        },

        housingMaintenanceCodeViolations: async (
            _: any,
            { borough, block, lot }
        ) => {
            const violations = await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                { borough, block, lot }
            );
            return violations.map(
                Reducers.reduceHousingMaintenanceCodeViolation
            );
        },
    },

    Property: {
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

        housingMaintenanceCodeViolations: async (property: TProperty) => {
            const violations = await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                property
            );
            return violations.map(
                Reducers.reduceHousingMaintenanceCodeViolation
            );
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
            return parties.map(Reducers.reduceParty);
        },
    },

    Party: {
        document: async (party: TParty) => {
            const document = await Document.getDocumentById(party.documentId);
            return maybeReduceFirst(document, Reducers.reduceDocument);
        },
    },
};
