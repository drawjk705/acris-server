import { BOROUGHS_BY_NAME } from '../reducers/constants';
import { stringifyClauses, submitQuery } from './utils';
import { RESOURCES } from './constants';

const propertyTypeCache: { [key: string]: string } = {};

type getProperrtyProps = {
    streetNumber: string | undefined;
    streetName: string | undefined;
    borough: string | undefined;
    block: number;
    lot: number;
};
export const Property = {
    getProperty: ({
        streetNumber,
        streetName,
        borough,
        block,
        lot,
    }: getProperrtyProps) => {
        const clauses = [
            streetNumber ? `street_number="${streetNumber}"` : '',
            streetName ? `street_name="${streetName}"` : '',
            borough ? `borough=${BOROUGHS_BY_NAME[borough]}` : '',
            block >= 0 ? `block=${block}` : '',
            lot >= 0 ? `lot=${lot}` : '',
        ];
        const queryString = stringifyClauses(clauses, 'and');
        return submitQuery(RESOURCES.RealPropertyLegals, {
            where: queryString,
        });
    },

    getPropertyTypeData: async ({ propertyType }: { propertyType: string }) => {
        if (propertyTypeCache[propertyType]) {
            return propertyTypeCache[propertyType];
        }
        const query = `property_type="${propertyType}"`;
        const result = await submitQuery(RESOURCES.PropertyTypeCodes, {
            where: query,
        });

        if (!result.length) {
            return {};
        }
        propertyTypeCache[propertyType] = result[0];
        return result[0];
    },
};

export type getPartiesProps = {
    name: string;
    addressLineOne: string;
    addressLineTwo: string;
    city: string;
    state: string;
    zipCode: string;
    documentId: string;
};

export const Party = {
    getParties: async ({
        documentId,
        name,
        addressLineOne,
        addressLineTwo,
        city,
        state,
        zipCode,
    }: Partial<getPartiesProps>) => {
        const queryString = stringifyClauses(
            [
                name ? `name="${name}"` : '',
                addressLineOne ? `address_1="${addressLineOne}"` : '',
                addressLineTwo ? `address_2="${addressLineTwo}"` : '',
                city ? `city="${city}"` : '',
                state ? `state="${state}"` : '',
                zipCode ? `zip="${zipCode}"` : '',
                documentId ? `document_id="${documentId}"` : '',
            ],
            'and'
        );
        return submitQuery(RESOURCES.RealPropertyParties, {
            where: queryString,
        });
    },
};

type getHousingMaintenanceCodeViolationProps = {
    borough: string;
    block: number;
    lot: number;
};

export const HousingMaintenanceCodeViolation = {
    getHousingMaintenanceCodeViolations: async ({
        borough,
        block,
        lot,
    }: getHousingMaintenanceCodeViolationProps) => {
        const queryString = stringifyClauses(
            [
                `boroid=${BOROUGHS_BY_NAME[borough]}`,
                `block=${block}`,
                `lot=${lot}`,
            ],
            'and'
        );
        return submitQuery(RESOURCES.HousingMaintenanceCodeViolation, {
            where: queryString,
        });
    },
};

export const Document = {
    getDocumentById: async (id: string) => {
        const query = `document_id="${id}"`;
        return submitQuery(RESOURCES.RealPropertyMaster, { where: query });
    },
};
