# Notes Mobile App

A React Native note-taking app built with **Expo** and **expo-router**. Create notes, organize them with categories, and search or sort your list. Includes authentication and a clean UI with **Poppins** font and custom modals.

## Features

- **Authentication** – Register and log in (credentials stored locally)
- **Notes** – Create, read, update, and delete notes with title, body, and category
- **Categories** – Manage categories; assign each note to a category
- **Search** – Search notes by title or content (every word in the query must match)
- **Sort** – Sort notes by date (newest or oldest first)
- **Filter** – Filter notes by category
- **UI** – Themed screens (cyan/teal), Poppins font, confirmation modals for delete actions, relative dates (Today, Yesterday, etc.), category pills on note cards

## Tech Stack

- **Expo** (SDK 54) with **expo-router** (file-based routing)
- **React Native** with TypeScript
- **AsyncStorage** for local auth and data persistence
- **Poppins** & **Inter** fonts (loaded via expo-font)
- **expo-haptics** for feedback on key actions

## Project Structure

```
app/
  _layout.tsx          # Root layout, auth check, font loading
  index.tsx             # Redirect to app or login
  (auth)/               # Auth group: Login, Register
  (app)/                # Main app: notes list, add/edit/detail, categories, profile
constants/
  theme.ts              # Colors, typography, shared styles
contexts/
  AuthContext.tsx       # Auth state and login/register
  CategoryContext.tsx   # Categories CRUD
  NoteContext.tsx       # Notes CRUD
components/
  ConfirmModal.tsx      # Reusable confirmation dialog
hooks/
  useInitialAuth.ts     # Waits for initial auth check before redirecting
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- [Expo Go](https://expo.dev/go) on your device (optional, for quick testing)

### Install and run

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npx expo start
   ```

3. **Open the app**

   - Press **a** for Android emulator  
   - Press **i** for iOS simulator  
   - Or scan the QR code with **Expo Go** on your device  

   Use **tunnel** only if LAN doesn’t work: `npx expo start --tunnel`

### Scripts

| Command            | Description                |
|--------------------|----------------------------|
| `npm start`        | Start Expo dev server      |
| `npm run android`  | Run on Android             |
| `npm run ios`      | Run on iOS                 |
| `npm run web`      | Run in browser             |
| `npm run lint`     | Run ESLint                 |

## Data and auth

- **Auth** and **notes/categories** are stored on the device using **AsyncStorage** (no backend).
- Each user has their own notes and categories; switching account clears in-memory data and reloads from storage for the signed-in user.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [expo-router](https://docs.expo.dev/router/introduction/) – file-based routing
- [React Native](https://reactnative.dev/)
