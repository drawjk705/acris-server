import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        property(
            streetName: String
            streetNumber: String
            boroughBlockLot: BoroughBlockLotInput
        ): [Property]!
        document(documentId: String!): Document
        parties(name: String, address: AddressInput): [Party]!
        housingMaintenanceCodeViolations(
            boroughBlockLot: BoroughBlockLotInput!
        ): [HousingMaintenanceCodeViolation]!
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
        housingMaintenanceCodeViolations: [HousingMaintenanceCodeViolation]!
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
        parties(name: String, address: AddressInput): [Party!]
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/636b-3b5g
    """
    type Party {
        documentId: String
        name: String
        address: Address
        document: Document
    }

    type Address {
        addressLineOne: String
        addressLineTwo: String
        city: String
        state: String
        zipCode: String
    }

    """
    https://dev.socrata.com/foundry/data.cityofnewyork.us/wvxf-dwi5
    """
    type HousingMaintenanceCodeViolation {
        apartment: String
        story: String
        inspectionDate: String
        originalCertifyByDate: String
        originalCorrectByDate: String
        newCertifyByDate: String
        newCorrectByDate: String
        orderNumber: String
        novDescription: String
        novIssuedDate: String
        currentStatus: String
        communityBoard: String
        violationStatus: String
    }

    # INPUTS
    input AddressInput {
        addressLineOne: String
        addressLineTwo: String
        city: String
        state: String
        zipCode: String
    }

    input BoroughBlockLotInput {
        borough: Borough!
        block: Int!
        lot: Int!
    }

    # ENUMS
    enum Borough {
        manhattan
        bronx
        brooklyn
        queens
        statenIsland
    }
`;
