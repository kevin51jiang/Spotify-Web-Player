import React, { Component } from 'react';
import axios from 'axios';

import { default_item } from './default';
import { authEndpoint, clientId, redirectUri, scopes } from './config';
import Player from "./Player";
import hash from "./hash";

import './App.css';

window.location.hash = "";


const barUpdateincrement = 800; //somehow keep this read only?
const infoUpdateIncrement = 7000;


class App extends Component {

    constructor() {
        super();

        this.state = {

            token: null,
            item: default_item,
            progress_ms: 0
        };

        this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
        this.tick = this.tick.bind(this);
    }

    async getCurrentlyPlaying(token) {
        console.log("Getting current song")

        await axios.get("https://api.spotify.com/v1/me/player",
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
            .catch(err => console.log(err));
    }

    componentDidMount() {
        let _token = hash.access_token;
        if (_token) {
            this.setState({
                token: _token
            });
        }
        this.getCurrentlyPlaying(_token);

        this.barInterval = setInterval(() => this.updateBar(), barUpdateincrement);
        this.interval = setInterval(() => this.tick(), infoUpdateIncrement);
    }


    updateBar() {
        if (this.state.token && this.state.is_playing) {
            this.setState({
                progress_ms: this.state.progress_ms + barUpdateincrement
            });

        }
    }

    tick() {
        if (this.state.token) {
            this.getCurrentlyPlaying(this.state.token);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    {!this.state.token && (
                        <a
                            className="btn btn--loginApp-link"
                            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                                "%20"
                            )}&response_type=token&show_dialog=true`}
                        >
                            Login to Spotify
                        </a>
                    )}
                    {this.state.token && (
                        <Player
                            item={this.state.item}
                            is_playing={this.state.is_playing}
                            progress_ms={this.state.progress_ms}
                        />
                    )}
                </header>
            </div>
        )
    }


}


export default App;
