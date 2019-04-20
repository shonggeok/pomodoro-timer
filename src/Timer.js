import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="timerDisplay" className="d-flex flex-row p-5">
        <div id="timerMinute" className="d-flex flex-column countdown-timer">
          <div className="px-3 py-2 display-1">{this.props.minutes < 10 ? '0' + this.props.minutes : this.props.minutes}</div>
          <div className="m-1">Minutes</div>
        </div>
        <div id="timerSecond" className="d-flex flex-column countdown-timer">
          <div className="px-3 py-2 display-1">{this.props.seconds < 10 ? '0' + this.props.seconds : this.props.seconds}</div>
          <div className="m-1">Seconds</div>
        </div>
      </div>
    );
  }
}

export default Timer;
