import { Reducers } from '../reducers';
import { mocks } from './mockObjects';

describe('Reducers', () => {
    describe('reduceProperty', () => {
        it('reduces correctly', () => {
            const property = Reducers.reduceProperty(mocks.property);

            expect(property).toMatchInlineSnapshot(`
        Object {
          "block": "1960",
          "borough": "brooklyn",
          "documentId": "2020050400791001",
          "lot": "38",
          "propertyType": "AP",
          "streetName": "CLINTON AVENUE",
          "streetNumber": "400",
          "unit": undefined,
        }
      `);
        });
    });

    describe('reducePropertyType', () => {
        it('reduces correctly', () => {
            const propertyType = Reducers.reducePropertyType(
                mocks.propertyType
            );

            expect(propertyType).toMatchInlineSnapshot(`
        Object {
          "description": "ADJACENT CONDOMINIUM UNIT TO BE COMBINED",
          "propertyType": "CA",
          "recordType": "G",
        }
      `);
        });
    });

    describe('reduceHousingMaintenanceCodeViolation', () => {
        it('reduces correctly', () => {
            const violation = Reducers.reduceHousingMaintenanceCodeViolation(
                mocks.violation
            );

            expect(violation).toMatchInlineSnapshot(`
        Object {
          "apartment": undefined,
          "communityBoard": "1",
          "currentStatus": "VIOLATION DISMISSED",
          "inspectionDate": "1997-04-11T00:00:00.000",
          "newCertifyByDate": undefined,
          "newCorrectByDate": undefined,
          "novDescription": "SECTION 27-2098 ADM CODE  FILE WITH THIS DEPARTMENT A REGISTRATION STATEMENT FOR BUILDING.",
          "novIssuedDate": "1997-04-22T00:00:00.000",
          "orderNumber": "772",
          "originalCertifyByDate": "1997-08-15T00:00:00.000",
          "originalCorrectByDate": "1997-08-08T00:00:00.000",
          "story": "All Stories",
          "violationStatus": "Close",
        }
      `);
        });
    });

    describe('reduceDocument', () => {
        it('reduces correctly', () => {
            const document = Reducers.reduceDocument(mocks.document);

            expect(document).toMatchInlineSnapshot(`
        Object {
          "amount": "485000.00",
          "crfn": "2020000144847",
          "date": "2020-04-10T00:00:00.000",
          "id": "2020050800759005",
          "type": "AGMT",
        }
      `);
        });
    });

    describe('reduceHpdJurisdictionData', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceHpdJurisdictionData(
                mocks.jurisdictionData
            );

            expect(result).toMatchInlineSnapshot(`
        Object {
          "buildingId": "859129",
          "communityBoardId": "0",
          "lifecycleStage": "Building",
          "managementProgram": "PVT",
          "numberOfApartments": undefined,
          "numberOfLegalStories": undefined,
          "numberOfRooms": undefined,
          "recordStatus": "Inactive",
          "recordStatusId": "2",
          "registrationId": "0",
        }
      `);
        });
    });

    describe('reduceRegistrationContact', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceRegistrationContact(mocks.contact);

            expect(result).toMatchInlineSnapshot(`
        Object {
          "businessAddress": Object {
            "addressLineOne": "312 W 109TH ST",
            "addressLineTwo": "Apartment undefined",
            "city": "NEW YORK",
            "state": "NY",
            "zipCode": "10025",
          },
          "contactDescription": "CORP",
          "corporationName": "ACADEMY STUDOS",
          "firstName": "SVEIN",
          "lastName": "JORGENSEN",
          "middleInitial": undefined,
          "title": undefined,
          "type": "Agent",
        }
      `);
        });
    });
});
