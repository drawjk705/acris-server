import gql from 'graphql-tag';

export const GET_PROPERTY = gql`
    query propertyByAddress($streetNumber: String, $streetName: String) {
        property(streetNumber: $streetNumber, streetName: $streetName) {
            borough
            block
            lot
        }
    }
`;
