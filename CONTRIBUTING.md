# Contributing to PeoChain Platform

Thank you for your interest in contributing to the PeoChain DeFi Platform! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful, inclusive, and constructive in all interactions.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the GitHub Issues.
2. If not, create a new issue with a clear title and description.
3. Include steps to reproduce, expected behavior, actual behavior, and screenshots if applicable.
4. Add relevant tags and assign the issue if possible.

### Suggesting Features

1. Check if the feature has already been suggested in the GitHub Issues.
2. If not, create a new issue with a clear title and description.
3. Explain why the feature would be beneficial to the project.
4. Provide as much detail as possible about how the feature might work.

### Pull Requests

1. Fork the repository and create a new branch from `main`.
2. Make your changes in the new branch.
3. Ensure your code follows the project's coding style.
4. Write or update tests as necessary.
5. Update documentation as needed.
6. Submit a pull request to the `main` branch with a clear description of the changes.

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/dkrizhanovskyi/peochain_web
   cd peochain-platform
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values.

4. Initialize the database:
   ```
   npm run db:push
   ```

5. Run the development server:
   ```
   npm run dev
   ```

## Project Structure

- `client/`: Frontend React application
- `server/`: Backend Express server
- `shared/`: Shared code between client and server

## Coding Guidelines

- Use TypeScript for all code.
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Use functional components with hooks for React.
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/).
- Add appropriate comments to complex code sections.

## Testing

- Write tests for all new features and bug fixes.
- Ensure all tests pass before submitting a pull request.
- Run tests with `npm test`.

## Documentation

- Update documentation for any changes to APIs, components, or functionality.
- Use clear, concise language and provide examples where appropriate.

## Review Process

1. At least one project maintainer will review each pull request.
2. Feedback may be provided, requiring additional changes.
3. Once approved, a maintainer will merge the pull request.

Thank you for contributing to PeoChain!