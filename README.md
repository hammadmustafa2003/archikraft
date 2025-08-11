# Archikraft

An AI-assisted floor plan design app. This monorepo contains a React frontend (Create React App) and an Express.js backend that proxies to supporting microservices and integrates Google Generative AI (Gemini) for chat-driven feature extraction. It also includes utilities for exporting SVG floor plans to PDF/PNG and optional Stripe client initialization.

## Project structure

```
archikraft/
  Backend/               # Express server (proxy/API + AI + PDF/PNG utilities)
    server.js
    package.json
  Frontend/              # React (CRA) app with Tailwind
    src/
    package.json
  README.md
```

## Prerequisites

- Node.js 18+ and npm
- Optional: A Python (or other) service exposing endpoints the backend proxies to (defaults used in code):
  - `http://0.0.0.0:8000` for user, chat, and news APIs
  - `http://127.0.0.1:8000/generateFloorPlan` for floor plan generation
- A Google Generative AI (Gemini) API key
- Optional: A Stripe publishable key if using Stripe features in the UI

## Quick start

### 1) Backend (Express)

- Install dependencies

```bash
cd Backend
npm install
```

- Create a `.env` file in `Backend/`:

```
API_KEY=your_google_gemini_api_key_here
# Optional, defaults to 5000
PORT=5000
```

- Start the server

```bash
node server.js
```

By default, the API will listen on `http://localhost:5000`.

### 2) Frontend (React CRA)

- Install dependencies

```bash
cd Frontend
npm install
```

- Create a `.env` file in `Frontend/` if using Stripe:

```
REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

- Start the development server

```bash
npm start
```

The app will run on `http://localhost:3000` by default.

## Configuration notes

- Tailwind is configured in `Frontend/tailwind.config.js` and scans `src/**/*.{js,jsx,ts,tsx}`.
- The frontend includes `config-overrides.js` to polyfill Node core modules in the browser. If you encounter polyfill-related errors, ensure you run with `react-app-rewired` scripts instead of `react-scripts`:

```json
{
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
  }
}
```

This project already has `react-app-rewired` in `devDependencies`. If you keep using `react-scripts` and do not hit polyfill issues, no change is strictly required.

## Backend API

Base URL: `http://localhost:5000`

- GET `/` — Health check, returns a welcome message
- POST `/signup` — Proxy to `GET http://0.0.0.0:8000/add-user` with query params: `name, username, password, email, phone, country, role`
- POST `/login` — Proxy to `GET http://0.0.0.0:8000/login-user` with query params: `email, password`
- POST `/forgot-password` — Verifies user and sends OTP via `GET http://0.0.0.0:8000/send-email`
- POST `/reset-password` — Proxy to `GET http://0.0.0.0:8000/update-password` with query params: `email, password`
- POST `/logout` — Destroys session
- POST `/saveMessage` — Uses Gemini to update a feature vector from user input, saves both user and AI messages via `POST http://0.0.0.0:8000/save-message`, and returns `{ answer, featureVector }`
- GET `/getMessages?id=...` — Proxy to `GET http://0.0.0.0:8000/get-messages`
- GET `/getUsers` — Proxy to `GET http://0.0.0.0:8000/get-all-users`
- POST `/deleteUser` — Proxy to `DELETE http://0.0.0.0:8000/delete-user` with `username` in params
- GET `/addNews?text=...` — Proxy to `GET http://0.0.0.0:8000/add-news`
- GET `/getNews` — Proxy to `GET http://0.0.0.0:8000/get-news`
- POST `/deleteNews` — Proxy to `DELETE http://0.0.0.0:8000/delete-news` with `id` in params
- POST `/getAllChatIds` — Proxy to `GET http://0.0.0.0:8000/get-all-chat-ids` with `user` param
- POST `/getChat` — Proxy to `GET http://0.0.0.0:8000/get-chat-by-id` with `id` param
- POST `/createChat` — Proxy to `GET http://0.0.0.0:8000/create-chat` with `user, timestamp`
- POST `/generateFloorPlan` — Proxy to `POST http://127.0.0.1:8000/generateFloorPlan` with `{ featureVector }`
- POST `/convertToPdf` — Accepts `{ svg }`, returns generated PDF
- POST `/convertToPng` — Accepts `{ svg }`, returns generated PNG

CORS is enabled globally on the backend.

## Gemini prompt contract (feature vector)

The backend expects the AI to return a JSON object with the following keys and numeric values, plus a natural-language `response` for the user:

```json
{
  "featureVector": {
    "NumberofLivingRooms": 0,
    "NumberofKitchens": 0,
    "NumberofBathrooms": 0,
    "NumberofDiningRooms": 0,
    "NumberofChildrenRooms": 0,
    "NumberofStudyRooms": 0,
    "NumberofBalconies": 0,
    "NumberofStorageRooms": 0,
    "WidthToLengthRatioofLandPlot": 0.0,
    "MaximumLengthofBedroom": 0.0,
    "MinimumLengthofBedroom": 0.0,
    "MaximumWidthofBedroom": 0.0,
    "MinimumWidthofBedroom": 0.0,
    "FrontDoorLocationX_axis": 0.0,
    "FrontDoorLocationY_axis": 0.0,
    "NumberofBedrooms": 0
  },
  "response": "..."
}
```

Missing values are represented as `-1` by convention in the prompt.

## Environment variables

- Backend (`Backend/.env`)
  - `API_KEY` — Google Generative AI (Gemini) API key (required for chat)
  - `PORT` — Port for Express server (optional; defaults to 5000)

- Frontend (`Frontend/.env`)
  - `REACT_APP_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (optional; only needed if Stripe flows are used)

## Development URLs

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Building for production

- Frontend

```bash
cd Frontend
npm run build
```

This produces a production build under `Frontend/build`. Serve it with any static file server or integrate it behind a reverse proxy. The backend does not currently serve the frontend build.

- Backend

Run the Node process (e.g., `node server.js`) behind a process manager like PM2 or a service unit, and configure environment variables for the host environment.

## Troubleshooting

- Polyfills error in the browser (e.g., `crypto`, `stream`): switch the CRA scripts to `react-app-rewired` as shown above so `config-overrides.js` is applied.
- CORS warnings: Backend enables CORS, but if calling third-party services directly from the frontend you may still need to use the backend as a proxy.
- Floor plan generation fails: ensure the service at `http://127.0.0.1:8000/generateFloorPlan` is running and reachable, and the request body includes a `featureVector` object.
- AI responses missing: verify `API_KEY` is set in `Backend/.env` and the server has outbound internet access.
- Backend missing dependency `body-parser`: if you encounter `Cannot find module 'body-parser'`, run `npm i body-parser` in `Backend/`.

## License

This project has no explicit license. If you plan to publish or redistribute, add a license file that matches your needs.
