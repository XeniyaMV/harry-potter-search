/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  preset: 'ts-jest',
  setupFiles: ['./jest.polyfills.cjs'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: [
    "<rootDir>/support/setupTests.ts"
 ],
 moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|svg)$': 'identity-obj-proxy',
 }
};