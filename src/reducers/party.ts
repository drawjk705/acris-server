import { TParty } from './types';

export const reduceParty = (partyObj: any): TParty => ({
    documentId: partyObj.document_id,
    name: partyObj.name,
    addressLineOne: partyObj.address_1,
    addressLineTwo: partyObj.address_2,
    city: partyObj.city,
    state: partyObj.state,
    zipCode: partyObj.zip,
});
