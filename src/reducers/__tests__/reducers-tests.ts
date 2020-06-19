import { Reducers } from '../reducers';
import { mocks } from './mockObjects';

describe('Reducers', () => {
    describe('reduceProperty', () => {
        it('reduces correctly', () => {
            const property = Reducers.reduceProperty(mocks.property);

            expect(property).toMatchSnapshot();
        });
    });

    describe('reducePropertyType', () => {
        it('reduces correctly', () => {
            const propertyType = Reducers.reducePropertyType(
                mocks.propertyType
            );

            expect(propertyType).toMatchSnapshot();
        });
    });

    describe('reduceHousingMaintenanceCodeViolation', () => {
        it('reduces correctly', () => {
            const violation = Reducers.reduceHousingMaintenanceCodeViolation(
                mocks.violation
            );

            expect(violation).toMatchSnapshot();
        });
    });

    describe('reduceDocument', () => {
        it('reduces correctly', () => {
            const document = Reducers.reduceDocument(mocks.document);

            expect(document).toMatchSnapshot();
        });
    });

    describe('reduceHpdJurisdictionData', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceHpdJurisdictionData(
                mocks.jurisdictionData
            );

            expect(result).toMatchSnapshot();
        });
    });

    describe('reduceRegistrationContact', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceRegistrationContact(mocks.contact);

            expect(result).toMatchSnapshot();
        });
    });

    describe('reduceValuationAndAssessmentData', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceValuationAndAssessmentData(
                mocks.valuationAndAssessmentData
            );

            expect(result).toMatchSnapshot();
        });
    });

    describe('reduceTaxClassData', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceTaxClassData(mocks.taxClassData);

            expect(result).toMatchSnapshot();
        });
    });

    describe('reduceDocumentType', () => {
        it('reduces correctly', () => {
            const result = Reducers.reduceDocumentType(mocks.documentType);

            expect(result).toMatchSnapshot();
        });
    });
});
