import { reduceQuery, createClause, ClauseSeparator } from '../utils';

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

    describe('createClause', () => {
        it('assembles clause correctly', () => {
            const clause = createClause()
                .addSubclause({ age: 19 })
                .addSubclause({ firstName: 'Bob' })
                .addSubclause({ lastName: 'Loblaw' })
                .addSubclause({ shoeSize: 9 })
                .stringifyClauses();

            expect(clause).toBe(
                'age=19 and upper(firstName)="BOB" and upper(lastName)="LOBLAW" and shoeSize=9'
            );
        });

        it('can create discrete clauses on repeat uses', () => {
            const clauseA = createClause()
                .addSubclause({ age: 19 })
                .addSubclause({ firstName: 'Bob' })
                .addSubclause({ lastName: 'Loblaw' })
                .addSubclause({ shoeSize: 9 })
                .stringifyClauses();
            const clauseB = createClause()
                .addSubclause({ age: 20 })
                .addSubclause({ firstName: 'Bobert' })
                .addSubclause({ middleInitial: 'G' })
                .addSubclause({ lastName: 'Loblawless' })
                .addSubclause({ shoeSize: 19 })
                .stringifyClauses();

            expect(clauseA).toBe(
                'age=19 and upper(firstName)="BOB" and upper(lastName)="LOBLAW" and shoeSize=9'
            );
            expect(clauseB).toBe(
                'age=20 and upper(firstName)="BOBERT" and upper(middleInitial)="G" and upper(lastName)="LOBLAWLESS" and shoeSize=19'
            );
        });

        it('stringifies single clause correctly', () => {
            const clause = createClause()
                .addSubclause({ age: 20 })
                .stringifyClauses();

            expect(clause).toBe('age=20');
        });

        it('omits falsey inputs', () => {
            const clause = createClause()
                .addSubclause({ firstName: '' })
                .addSubclause({ lastName: undefined })
                .addSubclause({ age: undefined })
                .addSubclause({ shoeSize: 9 })
                .addSubclause({ iq: 0 })
                .stringifyClauses();

            expect(clause).toBe('shoeSize=9 and iq=0');
        });

        it('handles dates correctly', () => {
            const clause = createClause()
                .addSubclause({
                    birthday: new Date('2020-01-01T00:00:00.000Z'),
                })
                .stringifyClauses();

            expect(clause).toBe('date_trunc_ymd(birthday)="2020-01-01"');
        });

        it('handles existing clauses correctly', () => {
            const existingClauseOne = createClause()
                .addSubclause({ name: 'Bob' })
                .addSubclause({ age: 12 })
                .stringifyClauses();

            const existingClauseTwo = createClause()
                .addSubclause({ name: 'Robert' })
                .addSubclause({ age: 13 })
                .stringifyClauses();

            const clause = createClause([existingClauseOne, existingClauseTwo])
                .addSubclause({ name: 'Bobert' })
                .addSubclause({ age: 17 })
                .stringifyClauses({ withParentheses: true });

            expect(clause).toBe(
                '(upper(name)="BOB" and age=12) and (upper(name)="ROBERT" and age=13) and (upper(name)="BOBERT" and age=17)'
            );
        });

        it('joins two existing clauses correctly', () => {
            const existingClauseOne = createClause()
                .addSubclause({ name: 'Bob' })
                .addSubclause({ age: 20 })
                .stringifyClauses();

            const existingClauseTwo = createClause()
                .addSubclause({ name: 'Robert' })
                .addSubclause({ age: 21 })
                .stringifyClauses();

            const combinedClauses = createClause([
                existingClauseOne,
                existingClauseTwo,
            ]).stringifyClauses({
                separator: ClauseSeparator.OR,
                withParentheses: true,
            });

            expect(combinedClauses).toBe(
                '(upper(name)="BOB" and age=20) or (upper(name)="ROBERT" and age=21)'
            );
        });
    });
});
