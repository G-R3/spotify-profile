# Spotify Profile

A react app to view your personal spotify data.

## Built with:

-   [React](https://reactjs.org/)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Spotify API](https://developer.spotify.com/documentation/web-api/)
-   [Express](https://expressjs.com/)
-   [React Router](https://reactrouter.com/)

## Getting started

1. Install dependencies

```bash
    > npm install
```

2. [Register your app with spotify](https://developer.spotify.com/dashboard/) and add `http://localhost:3001/callback` as a redirect URI under your app settings
3. Create `.env` file

```bash
CLIENT_ID=<SPOTIFY_CLIENT_ID>
CLIENT_SECRET=<SPOTIFY_CLIENT_SECRET>
REDIRECT_URI=http://localhost:3001/callback
```

4. Run the app

```bash
    > npm start
```
