import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        property(streetName: String, streetNumber: String): [Property]!
        document(documentId: String): Document
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/8h5j-fqxa
    """
    type Property {
        borough: Borough!
        block: Int!
        lot: Int!
        propertyType: PropertyType
        streetNumber: String
        streetName: String
        unit: String
        document: Document
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/94g4-w6xz
    """
    type PropertyType {
        recordType: String
        propertyType: String
        description: String
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/bnx9-e6tj
    """
    type Document {
        id: String
        CRFN: String
        type: String
        date: String
        amount: String
    }

    enum Borough {
        Manhattan
        Bronx
        Brooklyn
        Queens
        StatenIsland
    }
`;
