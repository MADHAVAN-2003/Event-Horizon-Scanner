# Event Horizon Scanner

A React Native mobile application designed for gatekeepers at large events to scan and validate visitor tickets efficiently, with robust offline capabilities.

## Features
- **Offline First**: Works completely offline after the initial data synchronization.
- **Fast Validation**: Validates tickets in less than 1 second from the local database (SQLite).
- **Prevent Duplicate Entry**: Detects and prevents already used tickets from being scanned again.
- **Multi-Device Synchronization**: Handles scenarios where multiple devices act as independent gates, preventing duplicate scans across devices when online, and securely queuing updates when offline.

## Database Structure
The application uses **Supabase** as the remote backend and **SQLite** for local storage.

### Tickets Table:
- `ticket_id` (String, Primary Key) - Unique identifier for the ticket.
- `name` (String) - Name of the attendee.
- `event_name` (String) - Name of the event.
- `status` (String) - Can be `valid` or `used`.

## Offline and Sync Strategy

### 1. Initial Data Sync
When the application starts with an active internet connection, it fetches the comprehensive ticket dataset (e.g., 50,000+ tickets) from the central Supabase database and caches it locally using `react-native-sqlite-storage`. After this initial sync, the app is fully capable of operating completely offline.

### 2. Offline Ticket Validation
During offline mode, ticket scanning and validation are performed entirely against the local SQLite database. When a QR code is scanned, the app instantly checks the local records to determine if the ticket is valid, used, or invalid, providing sub-second validation times without network dependency.

### 3. Synchronization and Multi-Device Handling
- **Local State Update**: Upon a successful scan, the ticket status is immediately updated to `used` in the local database to prevent duplicate entries at the same gate.
- **Background Sync**: The app continuously monitors network connectivity. When internet access is available, local changes (newly scanned tickets) are pushed to the central Supabase database.
- **Handling Multiple Gates**: To support 5-6 devices simultaneously scanning offline:
  - Local changes are queued and synced to the cloud once connectivity is restored.
  - The server acts as the ultimate source of truth. If conflicts arise, they are resolved centrally.
  - The app periodically pulls delta updates from the server to the local database to assure all gatekeeper devices reflect the latest ticket statuses, preventing a ticket used at Gate A from being accepted later at Gate B.

## Setup Instructions

### Prerequisites
- Node.js (>= 22.11.0)
- React Native Environment Setup for Android/iOS

### 1. Clone the repository and install dependencies
```sh
npm install
```

### 2. Environment Variables (.env setup)
Create a `.env` file in the root of the project. You can copy the contents from `.env.example` if it exists. Provide your Supabase keys and testing user credentials.

```sh
# .env
SUPABASE_PROJ_ID=your_supabase_project_id
SUPABASE_ANON_KEY=your_supabase_anon_key

# Test credentials for the app
USER_EMAIL=admin@eventhorizon.com
USER_PASSWORD=123456
```

### 3. iOS Setup (macOS only)
```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

### 4. Running the App

Start the Metro bundler:
```sh
npm start
```

Run on Android:
```sh
npm run android
```

Run on iOS:
```sh
npm run ios
```
