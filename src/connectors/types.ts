export enum QueryKeyword {
    select = 'select',
    where = 'where',
}

export type TQuery = {
    [QK in QueryKeyword]?: string;
};
