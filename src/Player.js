import React from 'react';


import "./Player.css";
import Control from './Control';


class Player extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    const backgroundStyles = {
      backgroundImage: `url(${this.props.item.album.images[0].url})`
    };

    const progressBarStyles = {
      width: (this.props.progress_ms * 100 / this.props.item.duration_ms) + "%"
    };

    const artistsToString = () => {
      return (`${this.props.item.artists.reduce((accum, artist) => accum + artist.name + ', ', '')}`).slice(0, -2)
    }

    return (
      <>
        <div className="main-wrapper">
          <div className="background" style={backgroundStyles} />{" "}
          <div className="now-playing__img">
            <img alt={this.props.item.album.artists ? (
              `Now playing ${this.props.item.name} by ${artistsToString()}`.slice(0, -2)
            ) : (
                "Nothing currently playing"
              )} src={this.props.item.album.images[0].url} />
          </div>
          <div className="now-playing__side">
            <div className="now-playing__name">{this.props.item.name}</div>
            <div className="now-playing__artist">

              {(`${this.props.item.artists.reduce((accum, artist) => accum + artist.name + ', ', '')}`).slice(0, -2)}
            </div>
            <div className="now-playing__status">
              {this.props.is_playing ? "Playing" : "Paused"}
            </div>
            <div className="progress">
              <div
                className="progress__bar"
                style={progressBarStyles}
              />

            </div>
            <Control
              className="control"
              is_playing={this.props.is_playing}
              stepBack={this.props.stepBack.bind(this)}
              stepForward={this.props.stepForward.bind(this)}
              togglePlay={this.props.togglePlay.bind(this)}
            />
          </div>

        </div>
      </>
    );
  }
}

export default Player;
