import { reduceQuery, ClauseSeparator, createClause } from '../utils';

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
                .addNumberSubclause({ age: 19 })
                .addStringSubclause({ firstName: 'Bob' })
                .addStringSubclause({ lastName: 'Loblaw' })
                .addNumberSubclause({ shoeSize: 9 })
                .stringifyClauses();

            expect(clause).toBe(
                'age=19 and upper(firstName)="BOB" and upper(lastName)="LOBLAW" and shoeSize=9'
            );
        });

        it('can create discrete clauses on repeat uses', () => {
            const clauseA = createClause()
                .addNumberSubclause({ age: 19 })
                .addStringSubclause({ firstName: 'Bob' })
                .addStringSubclause({ lastName: 'Loblaw' })
                .addNumberSubclause({ shoeSize: 9 })
                .stringifyClauses();
            const clauseB = createClause()
                .addNumberSubclause({ age: 20 })
                .addStringSubclause({ firstName: 'Bobert' })
                .addStringSubclause({ middleInitial: 'G' })
                .addStringSubclause({ lastName: 'Loblawless' })
                .addNumberSubclause({ shoeSize: 19 })
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
                .addNumberSubclause({ age: 20 })
                .stringifyClauses();

            expect(clause).toBe('age=20');
        });

        it('omits falsey inputs', () => {
            const clause = createClause()
                .addStringSubclause({ firstName: '' })
                .addStringSubclause({ lastName: undefined })
                .addNumberSubclause({ age: undefined })
                .addNumberSubclause({ shoeSize: 9 })
                .addNumberSubclause({ iq: 0 })
                .stringifyClauses();

            expect(clause).toBe('shoeSize=9 and iq=0');
        });

        it('handles dates correctly', () => {
            const clause = createClause()
                .addDateSubclause({
                    birthday: new Date('2020-01-01T00:00:00.000Z'),
                })
                .addDateSubclause(
                    {
                        anniversary: new Date('2020-01-01T00:00:00.000Z'),
                    },
                    { withTime: true }
                )
                .stringifyClauses();

            expect(clause).toBe(
                'date_trunc_ymd(birthday)="2020-01-01" and anniversary="2020-01-01T00:00:00.000"'
            );
        });
    });
});
