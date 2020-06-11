import { IResolvers } from 'graphql-tools';
import { Property } from '../connectors/acris/property';
import {
    reduceProperty,
    reducePropertyType,
    TProperty,
} from '../reducers/property';
import { Document } from '../connectors/acris/document';
import { reduceDocument } from '../reducers/document';

type propertyQueryProps = { streetNumber: string; streetName: string };
type documentQueryProps = { documentId: string };
export const resolvers: IResolvers = {
    Query: {
        property: async (
            _: any,
            { streetNumber, streetName }: propertyQueryProps
        ) => {
            const properties = await Property.getPropertyByName(
                streetNumber,
                streetName
            );

            return properties.map(reduceProperty);
        },

        document: async (_: any, { documentId }: documentQueryProps) => {
            const document = await Document.getDocumentById(documentId);

            if (!document.length) {
                return {};
            }
            return reduceDocument(document[0]);
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
            return reduceDocument(document[0]);
        },
    },
};
