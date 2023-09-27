import { defineConfig } from 'cypress';
import { testUser } from './cypress/models/user';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    baseUrl: 'https://arvutitark.ee/',
  },
  env: {
    testUser,
  },
});
