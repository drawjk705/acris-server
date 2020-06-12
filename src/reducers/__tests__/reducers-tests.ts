import { Reducers } from "../reducers";
describe("Reducers", () => {
  describe("reduceProperty", () => {
    [1, 2, 3, 4, 5].forEach((boroughId) => {
      it("reduces correctly", () => {
        const propertyObj = {
          borough: boroughId,
          block: 1234,
          lot: 5678,
          street_number: "123 WEST 95th",
          street_name: "BROADWAY",
          unit: "",
          property_type: "Apartment",
          document_id: "123-13432",
        };

        const property = Reducers.reduceProperty(propertyObj);

        expect(property).toMatchSnapshot();
      });
    });
  });

  describe("reducePropertyType", () => {
    it("reduces correctly", () => {
      const propertyTypeObj = {
        record_type: "vinyl",
        property_type: "ascii",
        description: "description",
      };

      const propertyType = Reducers.reducePropertyType(propertyTypeObj);

      expect(propertyType).toMatchInlineSnapshot(`
        Object {
          "description": "description",
          "propertyType": "ascii",
          "recordType": "vinyl",
        }
      `);
    });
  });

  describe("reduceHousingMaintenanceCodeViolation", () => {
    it("reduces correctly", () => {
      const violationObj = {
        apartment: "234F",
        story: "book",
        inspectiondate: "today",
        originalcertibydate: "yesterday",
        originalcorrectbydate: "tomorrow",
        ordernumber: "123",
        novdescription: "description",
        novissueddate: "yesteryear",
        currentstatus: "yes",
        communityboard: "bored",
        newcertifybydate: "eons ago",
        newcorrectbydate: "later",
        violationstatus: "violated",
      };

      const violation = Reducers.reduceHousingMaintenanceCodeViolation(
        violationObj
      );

      expect(violation).toMatchInlineSnapshot(`
        Object {
          "apartment": "234F",
          "communityBoard": "bored",
          "currentStatus": "yes",
          "inspectionDate": "today",
          "newCertifyByDate": "eons ago",
          "newCorrectByDate": "later",
          "novDescription": "description",
          "novIssuedDate": "yesteryear",
          "orderNumber": "123",
          "originalCertifyByDate": undefined,
          "originalCorrectByDate": "tomorrow",
          "story": "book",
          "violationStatus": "violated",
        }
      `);
    });
  });

  describe("reduceDocument", () => {
    it("reduces correctly", () => {
      const documentObj = {
        document_id: "id",
        crfn: "crfn",
        doc_type: "times new roman",
        date: "today",
        amount: "12,000",
      };

      const document = Reducers.reduceDocument(documentObj);

      expect(document).toMatchInlineSnapshot(`
        Object {
          "CRFN": "crfn",
          "amount": undefined,
          "date": undefined,
          "id": "id",
          "type": "times new roman",
        }
      `);
    });
  });
});
