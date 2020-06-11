module.exports = {
    roots: ['./src/reducers/__test__/'],
    testMatch: ['propertyReducers-tests.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};
