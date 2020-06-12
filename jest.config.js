module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**-tests**\\.[jt]s(x)?'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFiles: ['./jest/setup.ts'],
};
