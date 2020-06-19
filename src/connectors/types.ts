export enum QueryAction {
    SELECT = 'select',
    WHERE = 'where',
}

export type TQuery = {
    [QK in QueryAction]?: string;
};
