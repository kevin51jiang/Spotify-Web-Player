import React from "react";
import "./Player.css";


const Player = props => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album.images[0].url})`
  };

  const progressBarStyles = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + "%"
  };



  return (
    <>
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img alt={props.item.album.artists ? (
            `Now playing ${props.item.name} by ${props.item.artists.map(artist => artist.name + ', ')}`.slice(0, -2)
          ) : (
              "Nothing currently playing"
            )} src={props.item.album.images[0].url} />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            
            {(`${props.item.artists.reduce((accum, artist) => accum + artist.name + ', ', '') }`).slice(0,-2)}
          </div>
          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
          <div className="progress">
            <div
              className="progress__bar"
              style={progressBarStyles}
            />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </>
  );



}

export default Player;