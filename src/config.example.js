export const authEndpoint = 'https://accounts.spotify.com/authorize';

export const clientId = "YOUR CLIENT ID HERE";
export const redirectUri = "http://localhost:3000/redirect";

export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-modify-playback-state",
];


export const barUpdateincrement = 500; // time between progressbar updates (ms)
export const infoUpdateIncrement = 7000; // time between every poll to Spotify server (ms)