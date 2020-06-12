import { TDocument } from './types';

export const reduceDocument = (documentObj: any): TDocument => ({
    id: documentObj.document_id,
    CRFN: documentObj.crfn,
    type: documentObj.doc_type,
    date: documentObj.document_date,
    amount: documentObj.document_amt,
});
