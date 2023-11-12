/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    "<rootDir>/support/setupTests.ts"
 ],
 moduleNameMapper: {
  '\\.(jpg|jpeg|png|gif|svg)$': 'identity-obj-proxy',
 }
};