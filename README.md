# Boaz Study Portal Frontend

This is the frontend application for the **Boaz Study Portal**. It allows users to authenticate via Keycloak, manage their study journey records (tickets, funding requests, housing certificates), update profiles, and receive notifications via a responsive Dashboard interface.

## 🚀 Tech Stack

The application is built using a modern, fast, and scalable enterprise frontend stack:

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS v3/v4](https://tailwindcss.com/)
- **Authentication**: [Keycloak JS](https://www.keycloak.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **API Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/) 

## 📂 Project Structure

```
src/
├── assets/         # Static global assets (Icons, images)
├── components/     # Shared, reusable UI components (Buttons, Inputs, Layouts)
├── config/         # System configurations and routing variables
├── contracts/      # TypeScript interfaces and global DTOs
├── hooks/          # Custom reusable React hooks (e.g. useAuth, usePermissions)
├── portals/        # Feature-based architectures (Main Portal, Dashboard etc.)
├── services/       # Network logic, interceptors, keycloak wrapper
│   └── mock/       # Local MSW handlers and data mocks
├── store/          # Zustand global states (AppStore, AuthStore)
├── App.tsx         # Root layout configuring Auth and Routing Provider
└── main.tsx        # React entrypoint (and MSW worker start)
```

## 🛠 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed along with `npm` (or `yarn`/`pnpm`).

Additionally, for the authentication to work properly locally, make sure you configure your `.env` to point to a working Keycloak instance.

## 🌐 Environment Variables

Create a `.env` file at the root of the project with the following configuration:

```env
# API Base Configuration
VITE_API_BASE_URL=http://localhost:3000

# Keycloak Configuration
VITE_KEYCLOAK_URL=http://localhost:8080
VITE_KEYCLOAK_REALM=study-portal-realm
VITE_KEYCLOAK_CLIENT_ID=frontend-app
```

## 💻 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

By default, the Vite development server runs on `http://localhost:5173`. MSW will automatically intercept mock endpoints depending on your active `.env` configuration.

## 📦 Building for Production

Compile typescript and build the production-ready application :
```bash
npm run build
```

You can optionally preview the build with:
```bash
npm run preview
```

## 🧪 Mocking

Mock Service Worker (MSW) is configured to intercept calls sent to local environment APIs without replacing them. This enables frontend development decoupled from the backend. Mocks act based on absolute URL configurations defined in your Axios client and are strictly active only in the development environment.
