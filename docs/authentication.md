## Authentication Details

**Authentication Approach**

- React Context API & useReducer: Manages authentication state.

- Login Validation: Email and password validation using helper functions.

- Session Persistence: User authentication is stored in cookies.

**Implementation**

- Users must log in before accessing the dashboard.

- Incorrect credentials result in error messages.

- Successful authentication redirects to /dashboard/users.