name: Cypress Tests
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      # Checkout the repository
      - name: Checkout
        uses: actions/checkout@v3

      # Set up Node.js environment
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # Cache Node.js dependencies
      - name: Cache node modules
        uses: actions/cache@v3
        with:
          path: node_modules
          key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      # Install dependencies
      - name: Install dependencies
        run: npm ci

      # Start the server if needed (optional)
      - name: Start server
        run: npm run start & # Change this if you need to start your app server

      # Run Cypress tests
      - name: Run Cypress tests
        run: npx cypress run

      # Upload test results (optional)
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-results
          path: cypress-image-diff-html-report/
