module.exports = {
  // transform: {},
  watchPathIgnorePatterns: [
    '/node_modules/',
    '/*.json/',
    '/*.txt/',
    '/db/'
  ],
  coverageReporters: ['json'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js}',
    '!/db'
  ],
  // coverageProvider: 'v8',
  setupFilesAfterEnv: ['./setup.js']

}
