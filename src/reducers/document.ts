export type Document = {
    id: string;
    CRFN: string;
    type: string;
    date: string;
    amount: string;
};

export const reduceDocument = (documentObj: any): Document => ({
    id: documentObj.document_id,
    CRFN: documentObj.crfn,
    type: documentObj.doc_type,
    date: documentObj.document_date,
    amount: documentObj.document_amt,
});
