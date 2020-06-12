import { stringifyClauses, reduceQuery } from '../utils';

describe('utils', () => {
    describe('reduceQuery', () => {
        it('connects multiple query clauses together, and URI encodes the clauses', () => {
            const queryMap = {
                select: 'id, firstname, lastname',
                where: 'date=today',
            };

            const result = reduceQuery(queryMap);

            expect(result).toBe(
                '$select=id%2C%20firstname%2C%20lastname&$where=date%3Dtoday'
            );
        });

        it('ignores empty queries', () => {
            const queryMap = {
                select: 'id, firstname, lastname',
                where: '',
            };

            const result = reduceQuery(queryMap);

            expect(result).toBe('$select=id%2C%20firstname%2C%20lastname');
        });
    });

    describe('stringifyClauses', () => {
        it('connects each clause with separator', () => {
            const clauses = ['clause a', 'clause b', 'clause c'];
            const separator = 'and';

            const result = stringifyClauses(clauses, separator);

            expect(result).toBe('clause a and clause b and clause c');
        });

        it('ignores falsey clauses', () => {
            const clauses = ['clause a', '', 'clause b'];
            const separator = 'and';

            const result = stringifyClauses(clauses, separator);

            expect(result).toBe('clause a and clause b');
        });

        it('does not apply separator to single-clause list', () => {
            const singleClauseList = ['clause a'];
            const separator = 'and';

            const result = stringifyClauses(singleClauseList, separator);

            expect(result).toBe('clause a');
        });
    });
});
