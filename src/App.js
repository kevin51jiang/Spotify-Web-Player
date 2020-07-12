import React, { Component } from 'react';
import axios from 'axios';
import log from 'loglevel';
import { isDev } from "./utils";
import { default_item } from './default';
import { clientId, redirectUri, scopes, barUpdateincrement, infoUpdateIncrement } from './config';
import Player from "./Player";

import { SpotifyAuth } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";

import './App.css';


const BASE_API = "https://api.spotify.com/v1/me/player/";
log.setLevel(isDev ? 'INFO' : 'SILENT');

class App extends Component {

    constructor() {
        super();
        this.state = {
            token: null,
            item: default_item,
            progress_ms: 0
        };
    }

    /**
     * Send POST request to move to previous song
     * todo: if the user is >10% through song, move song to beginning, but don't go to previous song
     */
    stepBack = async () => {
        const cutoff = 20000; // time before seeking to start instead of going to previous track (ms)

        if (this.state.progress_ms < cutoff) { // go to previous track
            await axios.post(`${BASE_API}previous`,
                {},
                { headers: { 'Authorization': "Bearer " + this.state.token } })
                .catch(e => log.info(e));
        } else { // go to start of current track
            await axios.put(`${BASE_API}seek`,
                {},
                {
                    headers: { 'Authorization': "Bearer " + this.state.token },
                    params: { position_ms: 0 }
                })
                .catch(e => log.info(e));
        }
    }

    /**
     * Send POST request to move to next song
     */
    stepForward = async () => {
        await axios.post(`${BASE_API}next`,
            {},
            { headers: { 'Authorization': "Bearer " + this.state.token } })
            .catch(e => log.info(e));
    }

    /**
     * Send PUT request to pause/play
     */
    togglePlay = async (toPlay = null) => {

        if (toPlay) {         
            console.log('toPlay', toPlay)

            await axios.put(`${BASE_API}play`,
                {},
                { headers: { 'Authorization': "Bearer " + this.state.token }, data: { context_uri: toPlay} })
                .catch(e => console.log(e));
        } else {
            if (this.state.is_playing) { //if playing, then pause
                await axios.put(`${BASE_API}pause`,
                    {},
                    { headers: { 'Authorization': "Bearer " + this.state.token } })
                    .catch(e => console.log(e));
            } else { //if paused, then play

                await axios.put(`${BASE_API}play`,
                    {},
                    {
                        headers: {
                            'Authorization': "Bearer " + this.state.token
                        }
                    })
                    .catch(e => console.log(e));
            }

            this.setState({ is_playing: !this.state.is_playing }); //invert is_playing

        }
    }

    /**
     * Sends get request 
     * @param {string} token Spotify Auth token
     */
    getCurrentlyPlaying = async (token) => {

        log.info("Getting current song")

        await axios.get(BASE_API,
            { headers: { 'Authorization': "Bearer " + token } })
            .then(res => {
                if (res.data) {
                    this.setState({
                        item: res.data.item,
                        is_playing: res.data.is_playing
                    });
                    // only update if the counter is greater than 2 seconds off
                    // so that bar doesn't jump back and forth often 
                    if (Math.abs(this.state.progress_ms - res.data.progress_ms) > 2000) {
                        this.setState({
                            progress_ms: res.data.progress_ms
                        });
                    }
                } else {// if Spotify doesn't think you're listening to a song
                    this.setState({
                        item: default_item,
                        progress_ms: 0
                    })
                }
            })
            .catch(err => log.info(JSON.parse(JSON.stringify(err))));
    }

    componentDidMount() {
        // // check local storage
        const token = window.localStorage.getItem('spotifyAuthToken')

        log.debug('found token in localstorage', token)

        if (token) {
            this.setState({
                token: token
            });
            this.getCurrentlyPlaying(token);
        }

        // initialize intervals for checking info and updating progress bar
        this.barInterval = setInterval(() => this.updateBar(), barUpdateincrement);
        this.interval = setInterval(() => this.tick(), infoUpdateIncrement);
    }


    updateBar = () => {
        if (this.state.token && this.state.is_playing) {
            this.setState({
                progress_ms: this.state.progress_ms + barUpdateincrement
            });

        }
    }

    tick = () => {
        if (this.state.token) {
            this.getCurrentlyPlaying(this.state.token);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    onAccessToken = (token) => {
        log.info('setting access token ', token)
        this.setState({
            token: token
        })
        this.getCurrentlyPlaying(token);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {!this.state.token ?
                        <>
                            <h1>Spotify Web Player</h1>
                            <h2>Login to view your currently playing songs</h2>
                            <SpotifyAuth
                                redirectUri={redirectUri}
                                clientID={clientId}
                                scopes={scopes}
                                onAccessToken={this.onAccessToken}
                            />
                        </>
                        :
                        <Player
                            item={this.state.item}
                            is_playing={this.state.is_playing}
                            progress_ms={this.state.progress_ms}
                            stepBack={this.stepBack}
                            stepForward={this.stepForward}
                            togglePlay={this.togglePlay}
                        />
                    }
                </header>
            </div>
        )
    }


}


export default App;
