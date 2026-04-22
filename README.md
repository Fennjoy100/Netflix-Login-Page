# NETFLIX LOGIN PAGE

A dynamic and responsive Netflix-inspired login application built using React, Vite, Node.js, and Express. This project focuses on React state management with `useState`, frontend form validation, mock backend authentication, protected dashboard routing, responsive UI styling, API communication, and Vercel-ready deployment.

## Live Demo

- Repository: [Netflix-Login-Page](https://github.com/Fennjoy100/Netflix-Login-Page)

## Project Overview

**FENNJOY NETFLIX LOGIN PAGE** is a modern full-stack project that showcases:

- A Netflix-style login screen with a cinematic dark theme
- A clean and responsive interface for mobile, tablet, and desktop
- Email and password form handling using React state
- Frontend validation for required login fields
- Backend login handling with Express and mock credential checking
- API integration between the React frontend and Node.js backend
- Error handling for invalid login attempts and network issues
- A protected dashboard page shown after successful authentication
- Session-based login persistence using browser session storage
- Vercel-ready configuration for frontend and backend deployment

This project demonstrates strong fundamentals in React component structure, routing, state updates, Express API design, conditional rendering, responsive styling, and end-to-end login flow implementation.

## Technologies Used

- React: Component-based UI development
- Vite: Fast development server and frontend bundling
- Node.js: JavaScript runtime for backend execution
- Express: Backend server and mock authentication API
- React Router DOM: Client-side routing and protected page flow
- JavaScript (ES6+): Form handling, state updates, and API logic
- CSS3: Custom styling, responsive layout, gradients, and interaction effects
- Vercel: Deployment platform for the frontend and serverless backend

## Features

### Login Page Functionality

- Netflix-Inspired Login UI: Displays a dark, polished sign-in layout inspired by Netflix
- Email Input: Captures the user email or username entry
- Password Input: Captures the user password securely
- Sign In Button: Submits the login form to the backend
- Remember Me Option: Includes a familiar login helper control
- Demo Credentials Display: Shows the mock username and password directly on the page

### Form Handling and Validation

- React State Management: Uses `useState` to manage email, password, loading, and messages
- Required Field Validation: Prevents submission when email or password is empty
- Inline Error Feedback: Shows field-level messages for missing values
- Submit Loading State: Changes the button label while the request is being processed
- Error Reset Logic: Clears old errors when the user edits the inputs

### Backend Authentication

- Express API Endpoint: Handles login requests at `/api/login`
- Mock Credential Check: Verifies static credentials without using a database
- Empty Input Protection: Rejects incomplete requests on the backend
- Invalid Login Response: Returns a `401` response for incorrect credentials
- Success Response: Returns a mock user object after valid login
- Health Check Route: Includes a simple `/api/health` endpoint

### API Integration

- Frontend to Backend Connection: Sends login data using `fetch`
- JSON Request Handling: Submits structured login credentials to the API
- Response Parsing: Handles success and failure responses from the backend
- Network Error Handling: Displays a user-friendly fallback message if the request fails
- Local Development Proxy: Uses the Vite proxy to forward `/api` calls to Express

### Dashboard and Authentication Flow

- Success Redirect: Redirects users to `/dashboard` after successful login
- Protected Route: Prevents unauthenticated access to the dashboard
- Session Persistence: Stores the logged-in user in `sessionStorage`
- Auto Redirect: Sends authenticated users directly to the dashboard
- Logout Functionality: Clears session state and returns users to the login page

### Conditional Rendering

- Field Error Display: Validation messages appear only when needed
- Status Banner: Login failure or network messages show conditionally
- Submit Button State: The button switches between `Sign In` and `Signing In...`
- Protected View Rendering: The dashboard only appears when login state is valid
- Route Fallback: Unknown routes redirect back to the login page

### UI Design and Responsiveness

- Dark Cinematic Theme: Uses layered gradients and a strong red accent inspired by Netflix
- Responsive Layout: Keeps the card readable across small and large screens
- Mobile-Friendly Form Design: Inputs, buttons, and spacing adapt for narrow screens
- Dashboard Styling: Extends the same visual theme to the success screen
- Smooth Hover and Focus States: Buttons and inputs respond cleanly to interaction

## Development Process

- Frontend Setup: Built the interface with React and Vite for a fast development workflow
- State Management: Used React `useState` for form data, messages, loading, and auth state
- Routing Setup: Added `react-router-dom` for login, dashboard, and protected routes
- Backend Setup: Created an Express server with reusable app configuration
- API Flow: Connected the login form to the backend with `fetch` and JSON handling
- Validation Logic: Added both frontend validation and backend credential checks
- Visual Design: Built a Netflix-inspired interface using custom CSS rather than a UI library
- Deployment Prep: Added Vercel rewrites and a serverless API entrypoint for hosting

## Project Structure

```text
jk0/
|-- api/                             # Vercel serverless entrypoint
|   `-- index.js                     # Exports the Express app for deployment
|-- public/                          # Public static assets
|-- server/                          # Express backend source
|   |-- app.js                       # Express app with login and health routes
|   `-- index.js                     # Local server startup file
|-- src/                             # React frontend source
|   |-- App.jsx                      # Login page, dashboard, routing, and auth state
|   |-- App.css                      # Netflix-style component styling
|   |-- index.css                    # Global styles and typography setup
|   `-- main.jsx                     # React root with router setup
|-- index.html                       # Main HTML entry
|-- package.json                     # Project scripts and dependencies
|-- package-lock.json                # Locked dependency versions
|-- vite.config.js                   # Vite config with API proxy
|-- vercel.json                      # Vercel rewrite configuration
`-- README.md                        # Project documentation
```

## What I Learned

### React State Management

Improved understanding of how React state can manage form values, validation errors, loading states, session persistence, and protected page access in a login flow.

### API Communication

Learned how to connect a React frontend to an Express backend using `fetch`, JSON payloads, success handling, and error responses.

### Backend Authentication Logic

Gained practical experience building a mock authentication API, validating incoming data, and returning structured success and failure responses.

### Conditional Rendering

Strengthened the ability to render validation messages, loading labels, error banners, redirects, and protected pages only when the correct conditions are met.

### Responsive UI Design

Built a more polished and adaptable interface that keeps the Netflix-inspired design readable and attractive across mobile, tablet, and desktop screens.

## How It Can Be Improved

- Add Real Authentication: Connect the login flow to a database and real user accounts
- Use JWT or Sessions: Replace mock auth with secure token-based or server-side authentication
- Add Forgot Password Flow: Include password reset and recovery screens
- Improve Validation: Add email format validation and stronger password checks
- Persist Auth More Robustly: Use secure cookies or long-term storage where appropriate
- Add Signup Page: Extend the flow with a matching registration screen
- Add Testing: Include frontend and backend tests for validation and login behavior
- Add Environment Variables: Move sensitive configuration and API URLs into environment files

## Running the Project

To run locally:

1. Open a terminal in the project folder.
2. Install dependencies:

```bash
npm install
```

3. Start the frontend and backend together:

```bash
npm run dev
```

4. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Demo Credentials

Use these mock credentials to log in:

- Username: `viewer@netflixclone.dev`
- Password: `Stream@2026`

## Deployment

This project is ready to deploy on Vercel.

To deploy:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Vercel will detect the Vite frontend setup.
4. The `/api` route will use the serverless Express entrypoint.
5. Deploy and use the generated live URL.

## Notes

- The login form uses frontend validation before sending data to the backend
- The backend uses mock static credentials and does not require a database
- Successful login redirects users to a protected dashboard page
- Invalid login attempts show a clear error message on the page
- Auth state is stored in `sessionStorage` for the current browser session
- The same project supports local development and Vercel deployment
