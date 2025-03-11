# React + TypeScript + Vite

## Overview

The User Management Dashboard is a feature-rich, interactive web application for managing users, handling authentication, filtering, pagination, and more. Built with React (TypeScript), SCSS, React Router, and Vitest for testing, this dashboard provides seamless user experience and efficient data handling.

## Features

- **User Authentication**: Login functionality with validation.

- **User Management**: List, filter, search, and manage users.

- **Pagination & Filtering**: Custom hooks for optimized filtering and pagination.

- **Responsive Sidebar & Navigation**: Interactive sidebar with role-based navigation.

- **Data Fetching**: Fetch and manage users using React Context API & Reducer.

- **SCSS Styling**: Clean and reusable styling with variables.

- **Unit & Integration Testing**: Covered with Vitest & React Testing Library.

## Tech Stack

- **Frontend**: React (TypeScript), React Router, SCSS (Modules)

- **State Management**: React Context API & useReducer

- **Testing**: Vitest, React Testing Library

- **UI Components**: Custom reusable components

## Installation & Setup

### Prerequisites

Ensure you have Node.js (v16+) and npm or yarn installed.

- Clone the Repository

```$ git clone https://github.com/yemisi567/lendsqr-fe-test.git
   $ cd lendsqr-dashboard
```

- Install Dependencies

`$ npm install   # or yarn install`

- Set Up Environment Variables

- Create a _.env_ file in the project root and add the following:

```VITE_MOCKY_URL=https://api.mocky.io
   VITE_AUTH_TOKEN=your_auth_token
   VITE_MOCKY_ID=mocky_id
```

- Run Development Server

`$ npm run dev  # or yarn dev`

This starts the development server at http://localhost:5173

## Project Structure

📂 src/
- components/ # Reusable components (Pagination, Filters)
-  context/ # Auth & Users Context
-  hooks/ # Custom hooks (useFilter, usePagination)
-  ui/ # UI Elements (Buttons, Inputs, Popovers)
-  pages/ # Main app pages (Login, Dashboard, User Details)
- types/ # TypeScript types/interfaces
- utils/ # Helper functions
- assets/ # Icons, images, and styles
- component.test.tsx # Unit & integration tests (Vitest)

## Usage

- User Authentication

  Users can log in using their email and password.

  Authentication is managed using context & cookies.

- User Management

  View a list of users fetched from an external API.

  Use filters (username, email, status, etc.) to search for users.

- Sort users based on various parameters.

- Pagination & Filtering

  Custom pagination for navigating large datasets.

  Filtering users based on multiple criteria.

## Running Tests

Run All Tests

`$ npm test  # or yarn test`
