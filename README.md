# Star Wars API Project Documentation

## Project Overview

This project is a React application built with Vite for fast development and build processes. It uses TypeScript for type safety, Redux and Redux Toolkit Query (RTK Query) for data fetching and state management, and React Router for navigation. The application interacts with the Star Wars API (SWAPI) to fetch and display information about Star Wars characters.

## Project Structure

The project is structured to follow modern best practices, using ESLint and Prettier for code quality and consistency, and Husky and lint-staged for pre-commit hooks to ensure code quality before commits.

## Scripts

- **dev**: Starts the development server using Vite.
- **build**: Compiles TypeScript and builds the application using Vite.
- **lint**: Runs ESLint on the ./src/ directory.
- **lint:fix**: Runs ESLint with the --fix flag on the ./src/ directory.
- **preview**: Previews the production build locally.
- **format**: Formats the codebase using Prettier.
- **format:fix**: Formats the codebase and additional files using Prettier.
- **precommit**: Runs format and lint scripts before committing changes.
- **prepare**: Husky hook installation script.
- **test**: Run tests.
- **coverage**: Provide coverage report from v8.

## Husky

Husky is used to run the pre-commit hook which ensures that code formatting and linting are performed before a commit is made. The pre-commit hook runs the precommit script, which formats and lints the codebase.

## ESLint Configuration

ESLint is configured to work with TypeScript and React, ensuring code quality and consistency across the codebase. The configuration file .eslintrc.cjs includes settings and rules for linting JavaScript, JSX, TypeScript, and TSX files.

## Prettier Configuration

Prettier is used to format the codebase, ensuring a consistent coding style. The configuration file .prettierrc includes settings for Prettier.

## Running the Project

- Install Dependencies:

npm install

- Start Development Server:

npm run dev

## Usage

The application fetches data from the Star Wars API and displays information about characters, including their name, height, mass, and other attributes. Users can navigate through different characters using React Router.

## About me

I am [Natalia Ivantsova](https://github.com/NataliaIv90), a Front-End Developer from Ukraine, passionate about creating intuitive and dynamic user interfaces. This project was developed as part of a [React course at RSSchool](https://rs.school/courses/reactjs).
