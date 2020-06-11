import { RESOURCES } from './constants';
import { submitQuery } from '../utils';

const propertyTypeCache: { [key: string]: string } = {};

export const Property = {
    getPropertyByName: (streetNumber: string, streetName: string) => {
        const query = `street_number="${streetNumber}" and street_name="${streetName}"`;
        return submitQuery(RESOURCES.RealPropertyLegals, { where: query });
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
