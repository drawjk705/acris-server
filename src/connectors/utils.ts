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

type AddSubclauseObjProps = {
    [key: string]: string | number | Date | undefined;
};

enum SubclauseDataType {
    scalar = 'scalar',
    string = 'string',
    number = 'number',
    date = 'date',
    dateTime = 'dateTime',
}

const clauseTransformers: {
    field: {
        [dt in SubclauseDataType]: (
            field: string,
            value?: number | string | Date
        ) => string;
    };
    value: {
        [dt in SubclauseDataType]: (
            input?: string | number | Date
        ) => string | undefined;
    };
} = {
    field: {
        [SubclauseDataType.scalar]: (field, value) => {
            if (typeof value === 'string') {
                return `upper(${field})`;
            } else if (typeof value === 'number') {
                return field;
            }
            return '';
        },
        [SubclauseDataType.string]: (field) => `upper(${field})`,
        [SubclauseDataType.number]: (field) => field,
        [SubclauseDataType.date]: (field) => `date_trunc_ymd(${field})`,
        [SubclauseDataType.dateTime]: (field) => field,
    },
    value: {
        [SubclauseDataType.scalar]: (value) => {
            if (typeof value === 'number') {
                return Number(value) >= 0 ? `${value}` : undefined;
            } else if (typeof value === 'string') {
                return value
                    ? `"${(value as string).toUpperCase()}"`
                    : undefined;
            }
            return undefined;
        },
        [SubclauseDataType.string]: (value) =>
            value ? `"${(value as string).toUpperCase()}"` : undefined,

        [SubclauseDataType.number]: (value) =>
            Number(value) >= 0 ? `${value}` : undefined,

        [SubclauseDataType.date]: (value) =>
            value
                ? `"${(value as Date).toISOString().replace(/T.*$/, '')}"`
                : undefined,
        [SubclauseDataType.dateTime]: (value) =>
            value
                ? `"${(value as Date).toISOString().replace(/Z$/, '')}"`
                : undefined,
    },
};

export const createClause = (existingClauses: Array<string> = []) => {
    const newClauses: Array<string | undefined> = [];

    const addSubclause = (
        obj: AddSubclauseObjProps,
        type: SubclauseDataType,
        relationship = ClauseRelationship.EQUAL
    ) => {
        newClauses.push(
            Object.entries(obj).map(([field, value]) => {
                const fieldTransformed = clauseTransformers.field[type](
                    field,
                    value
                );
                const valueTransformed = clauseTransformers.value[type](value);

                return valueTransformed !== undefined
                    ? `${fieldTransformed}${relationship}${valueTransformed}`
                    : '';
            })[0]
        );

        return clauseCreator;
    };

    const clauseCreator = {
        addScalarSubclause: (
            obj: { [key: string]: string | number | undefined },
            relationship = ClauseRelationship.EQUAL
        ) => addSubclause(obj, SubclauseDataType.scalar, relationship),

        addStringSubclause: (
            obj: { [key: string]: string | undefined },
            relationship = ClauseRelationship.EQUAL
        ) => addSubclause(obj, SubclauseDataType.string, relationship),

        addNumberSubclause: (
            obj: { [key: string]: number | undefined },
            relationship = ClauseRelationship.EQUAL
        ) => addSubclause(obj, SubclauseDataType.number, relationship),

        addDateSubclause: (
            obj: { [key: string]: Date | undefined },
            relationship = ClauseRelationship.EQUAL
        ) => addSubclause(obj, SubclauseDataType.date, relationship),

        addDateTimeSubclause: (
            obj: { [key: string]: Date | undefined },
            relationship = ClauseRelationship.EQUAL
        ) => addSubclause(obj, SubclauseDataType.dateTime, relationship),

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
