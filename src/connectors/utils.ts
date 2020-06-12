import { TQuery } from './types';
import { get } from './api/get';

export const submitQuery = (resource: string, query: TQuery) => {
    const queryStringified = reduceQuery(query);
    return get(`${resource}.json?${queryStringified}`);
};

export enum ClauseSeparator {
    AND = 'and',
    COMMA = 'comma',
}

export const stringifyClauses = (
    clauses: Array<string>,
    separator: ClauseSeparator
): string => clauses.filter((clause) => !!clause).join(` ${separator} `);

export const createClause = {
    withStringValue: (
        obj: { [key: string]: string | undefined },
        relationship = '='
    ) =>
        Object.entries(obj).map(([field, value]) =>
            value
                ? `upper(${field})${relationship}"${value.toUpperCase()}"`
                : ''
        )[0],
    withNumberValue: (obj: { [key: string]: number }, relationship = '=') =>
        Object.entries(obj).map(([field, value]) =>
            Number(value) >= 0 ? `${field}${relationship}${value}` : ''
        )[0],
};

export const reduceQuery = (query: TQuery): string =>
    Object.entries(query)
        .map(([queryKeyword, queryContent]) =>
            queryContent ? `$${queryKeyword}=${queryContent}` : ''
        )
        .filter((str) => !!str)
        .join('&');
