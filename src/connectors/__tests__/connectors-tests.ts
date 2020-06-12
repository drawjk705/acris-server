import { mocked } from 'ts-jest/utils';
import { get } from '../api/get';
import * as utils from '../utils';
import {
    Property,
    Party,
    Document,
    HousingMaintenanceCodeViolation,
} from '../connectors';

jest.mock('../api/get');
mocked(get);

const submitQuerySpy = jest.spyOn(utils, 'submitQuery');
const stringifyClausesSpy = jest.spyOn(utils, 'stringifyClauses');

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

                expect(stringifyClausesSpy).toHaveBeenCalledWith(
                    [
                        'street_number="123"',
                        'street_name="Penny Lane"',
                        'borough=1',
                        'block=1',
                        'lot=2',
                    ],
                    'and'
                );
                expect(submitQuerySpy).toHaveBeenCalledWith('8h5j-fqxa', {
                    where: expect.any(String),
                });
            });

            it('calls stringify with empty string for falsey string arguments, but passes in 0 for numbers', async () => {
                props.streetNumber = '';
                props.streetName = undefined;
                props.borough = 'manhattan';
                props.block = 0;
                props.lot = undefined;

                await Property.getProperty(props);

                expect(stringifyClausesSpy).toHaveBeenCalledWith(
                    ['', '', 'borough=1', 'block=0', ''],
                    'and'
                );
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
                    where: 'property_type="propertyType"',
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
                    addressLineOne: 'line 1',
                    addressLineTwo: 'line 2',
                    city: 'city',
                    state: 'denial',
                    zipCode: '12345',
                };
            });

            it('calls with correct values when all props are included', async () => {
                await Party.getParties(props);

                expect(stringifyClausesSpy).toHaveBeenCalledWith(
                    [
                        'name="name"',
                        'address_1="line 1"',
                        'address_2="line 2"',
                        'city="city"',
                        'state="denial"',
                        'zip="12345"',
                        'document_id="documentId"',
                    ],
                    'and'
                );

                expect(submitQuerySpy).toHaveBeenCalledWith('636b-3b5g', {
                    where: expect.any(String),
                });
            });

            it('calls stringifyClauses with empty strings for falsey inputs', async () => {
                props.name = undefined;
                props.addressLineOne = '';

                await Party.getParties(props);

                expect(stringifyClausesSpy).toHaveBeenCalledWith(
                    [
                        '',
                        '',
                        'address_2="line 2"',
                        'city="city"',
                        'state="denial"',
                        'zip="12345"',
                        'document_id="documentId"',
                    ],
                    'and'
                );
            });
        });
    });

    describe('Document', () => {
        describe('getDocumentById', () => {
            it('calls submitQuery with query', async () => {
                await Document.getDocumentById('documentId');

                expect(submitQuerySpy).toHaveBeenCalledWith('bnx9-e6tj', {
                    where: 'document_id="documentId"',
                });
            });
        });
    });

    describe('HousingMaintenanceCodeViolation', () => {
        describe('getHousingMaintenanceCodeViolations', () => {
            it('calls submit query with correct values', async () => {
                await HousingMaintenanceCodeViolation.getHousingMaintenanceCodeViolations(
                    { borough: 'manhattan', block: 1, lot: 1 }
                );

                expect(submitQuerySpy).toHaveBeenCalledWith('wvxf-dwi5', {
                    where: 'boroid=1 and block=1 and lot=1',
                });
            });
        });
    });
});
