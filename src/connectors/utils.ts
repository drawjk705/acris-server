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

type AddSubclauseObjProps<T> = {
    [key: string]: T | undefined;
};

export const createClause = (existingClauses = '') => {
    const clauses: [string | undefined] = [existingClauses];

    const clauseCreator = {
        addStringSubclause: (
            obj: AddSubclauseObjProps<string>,
            relationship = ClauseRelationship.EQUAL
        ) => {
            clauses.push(
                Object.entries(obj).map(([field, value]) =>
                    value
                        ? `upper(${field})${relationship}"${value.toUpperCase()}"`
                        : ''
                )[0]
            );

            return clauseCreator;
        },

        addNumberSubclause: (
            obj: AddSubclauseObjProps<number>,
            relationship = ClauseRelationship.EQUAL
        ) => {
            clauses.push(
                Object.entries(obj).map(([field, value]) =>
                    Number(value) >= 0 ? `${field}${relationship}${value}` : ''
                )[0]
            );

            return clauseCreator;
        },

        addDateSubclause: (
            obj: AddSubclauseObjProps<Date>,
            { withTime = false, relationship = ClauseRelationship.EQUAL } = {}
        ) => {
            clauses.push(
                Object.entries(obj).map(([field, value]) => {
                    if (!value) {
                        return '';
                    }

                    const fieldWithOrWithoutTime = withTime
                        ? field
                        : `date_trunc_ymd(${field})`;

                    const valueWithOrWithoutTime = withTime
                        ? value.toISOString().replace(/Z$/, '')
                        : value.toISOString().replace(/T.*$/, '');

                    return `${fieldWithOrWithoutTime}${relationship}"${valueWithOrWithoutTime}"`;
                })[0]
            );

            return clauseCreator;
        },

        stringifyClauses: (separator = ClauseSeparator.AND) =>
            clauses.filter((clause) => !!clause).join(` ${separator} `),
    };

    return clauseCreator;
};

export enum ClauseRelationship {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL = '>=',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
}

export const reduceQuery = (query: TQuery): string =>
    Object.entries(query)
        .map(([queryKeyword, queryContent]) =>
            queryContent
                ? `$${queryKeyword}=${encodeURIComponent(queryContent)}`
                : ''
        )
        .filter((str) => !!str)
        .join('&');
