export const authEndpoint = 'https://accounts.spotify.com/authorize';

export const clientId = "316e898df20d4a0d8c486499c9dc7abf";
export const redirectUri = "http://localhost:3000/redirect";

export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-modify-playback-state",
];


export const barUpdateincrement = 500; // time between progressbar updates (ms)
export const infoUpdateIncrement = 7000; // time between every poll to Spotify server (ms)