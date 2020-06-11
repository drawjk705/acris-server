import { submitQuery } from '../utils';
import { RESOURCES } from './constants';

export const Document = {
    getDocumentById: async (id: string) => {
        const query = `document_id="${id}"`;
        return submitQuery(RESOURCES.RealPropertyMaster, { where: query });
    },
};
