# delivery app

This repository contains a Vite‑powered React frontend (`react-delivery/react-delivery`) and a simple Express backend (`react-delivery/server`).

## Running locally

### Development (separate servers)

1. **Start backend** (port 3001 by default):
   ```bash
   cd server
   npm install
   npm run dev   # nodemon will watch for changes
   ```

2. **Start frontend** (port 8080 by default):
   ```bash
   cd react-delivery
   npm install
   npm run dev
   ```

The frontend development server proxies `/orders` and `/user` to the backend.  Add items in the UI and click **Continue to Payment**; the order will be posted to the server and stored in memory.  Check `GET /orders` for stored orders.

### Single‑server mode (serve built frontend)

You can build the React app and have the Express server serve it directly, eliminating the need for the Vite development server.  This is useful for deployment or simple local testing:

```bash
cd server
npm install          # ensures the client build step runs
npm run start:all    # builds client and then starts server in production mode
```

After running the above, open `http://localhost:3001` in your browser; the React UI is served by Express, and all API requests (`/orders`, `/user`, etc.) are handled by the same process.  Re‑running `npm run start:all` after editing client code will rebuild the frontend.

The `start` script (without `:all`) also serves static assets if they exist; `npm run build:client` is available to only compile the React bundle.
