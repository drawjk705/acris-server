import { mocked } from 'ts-jest/utils';
import { get } from '../api/get';
import * as utils from '../utils';
import {
    Property,
    Party,
    Document,
    HousingMaintenanceCodeViolation,
    HpdJurisdictionData,
    RegistrationContacts,
    ValuationAndAssessmentData,
    TaxClassData,
    DocumentType,
} from '../connectors';
import { Borough } from '../../reducers/constants';

jest.mock('../api/get');
mocked(get);

const submitQuerySpy = jest.spyOn(utils, 'submitQuery');

describe('Connectors', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Property', () => {
        describe('getProperty', () => {
            let props: any;

            beforeEach(() => {
                jest.clearAllMocks();
                props = {
                    streetNumber: '123',
                    streetName: 'Penny Lane',
                    borough: 'manhattan',
                    block: 1,
                    lot: 2,
                };
            });

            it('calls with correct values when all props are included', async () => {
                await Property.getProperty(props);

                expect(submitQuerySpy).toHaveBeenCalledWith('8h5j-fqxa', {
                    where: expect.any(String),
                });
            });
        });

        describe('getPropertyTypeData', () => {
            const props = { propertyType: 'propertyType' };
            const submitQueryMock = mocked(utils.submitQuery);

            beforeAll(() => {
                jest.clearAllMocks();
            });

            it('calls submit query with values', async () => {
                submitQueryMock.mockResolvedValue([]);

                await Property.getPropertyTypeData(props);

                expect(submitQuerySpy).toHaveBeenCalledWith('94g4-w6xz', {
                    where: 'upper(property_type)="PROPERTYTYPE"',
                });
            });

            it('returns empty object if no results are returned', async () => {
                submitQueryMock.mockResolvedValue([]);

                const result = await Property.getPropertyTypeData(props);

                expect(result).toEqual({});
            });

            it('returns first element in results if results are returned', async () => {
                submitQueryMock.mockResolvedValue(['res1', 'res2']);

                const result = await Property.getPropertyTypeData(props);

                expect(result).toBe('res1');
            });
        });
    });

    describe('Party', () => {
        describe('getParties', () => {
            let props: any;

            beforeEach(() => {
                props = {
                    documentId: 'documentId',
                    name: 'name',
                    address: {
                        addressLineOne: 'line 1',
                        addressLineTwo: 'line 2',
                        city: 'city',
                        state: 'denial',
                        zipCode: '12345',
                    },
                };
            });

            it('calls with correct values when all props are included', async () => {
                await Party.getParties(props);

                expect(submitQuerySpy).toHaveBeenCalledWith('636b-3b5g', {
                    where: expect.any(String),
                });
            });
        });
    });

    describe('Document', () => {
        describe('getDocumentById', () => {
            it('calls submitQuery with query', async () => {
                await Document.getDocumentById('documentId');

                expect(submitQuerySpy).toHaveBeenCalledWith('bnx9-e6tj', {
                    where: 'upper(document_id)="DOCUMENTID"',
                });
            });
        });
    });

    describe('HousingMaintenanceCodeViolation', () => {
        describe('getHousingMaintenanceCodeViolations', () => {
            it('calls submit query with correct values', async () => {
                await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                    { borough: Borough.MANHATTAN, block: 1, lot: 1 }
                );

                expect(submitQuerySpy).toHaveBeenCalledWith('wvxf-dwi5', {
                    where: 'boroid=1 and block=1 and lot=1',
                });
            });
        });
    });

    describe('HPD Jurisdiction Data', () => {
        describe('getHpdJurisdictionData', () => {
            it('calls submit query with correct values', async () => {
                await HpdJurisdictionData.getHpdJurisdictionData({
                    borough: Borough.MANHATTAN,
                    block: 1,
                    lot: 2,
                });

                expect(submitQuerySpy).toHaveBeenLastCalledWith('kj4p-ruqc', {
                    where: 'boroid=1 and block=1 and lot=2',
                });
            });
        });
    });

    describe('Registration Contacts', () => {
        describe('getRegistrationContacts', () => {
            it('calls submit query with correct values', async () => {
                await RegistrationContacts.getRegistrationContacts({
                    registrationId: 12123,
                });

                expect(submitQuerySpy).toHaveBeenCalledWith('feu5-w2e2', {
                    where: 'registrationid=12123',
                });
            });
        });
    });

    describe('Property Valuation and Assessment Data', () => {
        describe('getValuationAndAssessmentData', () => {
            it('calls submit query with correct values', async () => {
                await ValuationAndAssessmentData.getValuationAndAssessmentData({
                    bble: '1000010001',
                    borough: 1,
                    block: 1,
                    lot: 1,
                });

                expect(submitQuerySpy).toHaveBeenCalledWith('yjxr-fw8i', {
                    where:
                        '(upper(bble)="1000010001") or (boro=1 and block=1 and lot=1)',
                });
            });
        });
    });

    describe('Tax Class Data', () => {
        describe('getTaxClassData', () => {
            it('calls submit query with correct values', async () => {
                await TaxClassData.getTaxClassData({
                    borough: 1,
                    block: 1,
                    lot: 1,
                });

                expect(submitQuerySpy).toHaveBeenCalledWith('8y4t-faws', {
                    where: 'boro=1 and block=1 and lot=1',
                });
            });
        });
    });

    describe('Document Type', () => {
        describe('getDocumentType', () => {
            it('calls submit query with correct values', async () => {
                await DocumentType.getDocumentType({
                    type: '12312',
                });

                expect(submitQuerySpy).toHaveBeenCalledWith('7isb-wh4c', {
                    where: 'upper(doc__type)="12312"',
                });
            });
        });
    });
});
