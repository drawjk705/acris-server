import { TQuery } from './types';
import { get } from './api/get';

export const submitQuery = (resource: string, query: TQuery) => {
    const queryStringified = reduceQuery(query);
    return get(`${resource}.json?${queryStringified}`);
};

export const stringifyClauses = (
    clauses: Array<string>,
    separator: string
): string => clauses.filter((clause) => !!clause).join(` ${separator} `);

export const reduceQuery = (query: TQuery): string =>
    Object.entries(query)
        .map(([queryKeyword, queryContent]) =>
            queryContent
                ? `$${queryKeyword}=${encodeURIComponent(queryContent)}`
                : ''
        )
        .filter((str) => !!str)
        .join('&');
