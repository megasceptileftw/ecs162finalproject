// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js app
})

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
