import React, { Component } from 'react';

import { MdSkipPrevious, MdPlayCircleOutline, MdPauseCircleOutline, MdSkipNext } from 'react-icons/md';

import './Control.css';

class Control extends Component {
    constructor(props) {
        super(props);
    }

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
                <button onClick={this.stepBack.bind(this)}><MdSkipPrevious /></button>
                <button onClick={this.togglePlay.bind(this)} className="centerButton"> {this.props.is_playing ? <MdPauseCircleOutline /> : <MdPlayCircleOutline />} </button>
                <button onClick={this.stepForward.bind(this)}><MdSkipNext /></button>
            </div>
        );
    }
}

export default Control;