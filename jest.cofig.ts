export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['**/node_modules/'],
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/src/**/*.spec.ts'],
    rootDir: '.',
};
