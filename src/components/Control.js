import React, { Component } from 'react';

import { MdSkipPrevious, MdPlayCircleOutline, MdPauseCircleOutline, MdSkipNext } from 'react-icons/md';

import './Control.css';

class Control extends Component {

    stepBack = () => {
        this.props.stepBack();
    }

    togglePlay = () => {
        this.props.togglePlay();
    }

    stepForward = () => {
        this.props.stepForward();
    }

    render() {
        return (
            <div className="controller">
                <button onClick={this.stepBack}><MdSkipPrevious /></button>
                <button onClick={this.togglePlay} className="centerButton"> {this.props.is_playing ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />} </button>
                <button onClick={this.stepForward}><MdSkipNext /></button>
            </div>
        );
    }
}

export default Control;