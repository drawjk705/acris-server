import { TQuery } from './types';
import { get } from './api/get';

export const submitQuery = (resource: string, query: TQuery) => {
    const queryStringified = reduceQuery(query);
    return get(`${resource}.json?${queryStringified}`);
};

export enum ClauseSeparator {
    AND = 'and',
    COMMA = 'comma',
    OR = 'or',
}

const typeMatches = {
    string: (variable: any) => typeof variable === 'string',
    number: (variable: any) => typeof variable === 'number',
    date: (variable: any) => variable instanceof Date,
    array: (variable: any) => Array.isArray(variable),
};

const TypeMatcher = <T extends { [key: string]: (val: any) => boolean }>(
    typeMatches: T
) => ({
    match: (variableToMatch: any) => ({
        with: (handlers: { [key in keyof T]?: () => any }) => {
            let handler: () => any = () => {};
            for (let key in handlers) {
                if (typeMatches[key as keyof T](variableToMatch)) {
                    handler = handlers[key as keyof T] as () => any;
                    return handler();
                }
            }
        },
    }),
});

type AddSubclauseObjProps = {
    [key: string]: string | string[] | number | Date | undefined;
};

export const createClause = (existingClauses: Array<string> = []) => {
    const newClauses: Array<string | undefined> = [];

    const clauseCreator = {
        addSubclause: (
            obj: AddSubclauseObjProps,
            relationship = ClauseRelationship.EQUAL
        ) => {
            newClauses.push(
                ...Object.entries(obj).map(([field, value]) => {
                    return TypeMatcher(typeMatches)
                        .match(value)
                        .with({
                            string: () =>
                                value
                                    ? `upper(${field})${relationship}"${(value as string).toUpperCase()}"`
                                    : '',
                            number: () => `${field}${relationship}${value}`,
                            date: () =>
                                `date_trunc_ymd(${field})${relationship}"${(value as Date)
                                    .toISOString()
                                    .replace(/T.*$/, '')}"`,
                            array: () =>
                                `upper(${field}) in(${(value as string[])
                                    .map((value) => `"${value.toUpperCase()}"`)
                                    .join(',')})`,
                        });
                })
            );

            return clauseCreator;
        },

        stringifyClauses: ({
            separator = ClauseSeparator.AND,
            withParentheses = false,
        } = {}) => {
            const filteredExistingClauses = existingClauses
                .filter((clause) => !!clause)
                .map((clause) => (withParentheses ? `(${clause})` : clause));

            const filteredNewClauses = newClauses
                .filter((clause) => !!clause)
                .join(` ${separator} `);

            const filteredNewClausesToAdd = filteredNewClauses.length
                ? filteredNewClauses
                : [];

            const clausesAllTogether = filteredExistingClauses.concat(
                withParentheses && filteredNewClausesToAdd.length
                    ? `(${filteredNewClausesToAdd})`
                    : filteredNewClausesToAdd
            );

            return clausesAllTogether.join(` ${separator} `);
        },
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

type TAccumulator = { [key: string]: any[] };
export const groupPropertiesByAddress = (
    properties: any[] = []
): TAccumulator =>
    properties.reduce((acc: TAccumulator, property) => {
        if (
            (property as Object).hasOwnProperty('street_number') &&
            (property as Object).hasOwnProperty('street_name')
        ) {
            const key = `${property.street_number.toUpperCase()}_${property.street_name.toUpperCase()}`;

            if ((acc as Object).hasOwnProperty(key)) {
                acc[key].push(property);
            } else {
                acc[key] = [property];
            }
        } else {
            acc[property.document_id] = [property];
        }

        return acc;
    }, {});
