import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="timerDisplay" class="d-flex flex-row p-5">
        <div id="timerMinute" class="d-flex flex-column">
          <div class="px-3 py-2 display-2">{this.props.minutes < 10 ? '0' + this.props.minutes : this.props.minutes}</div>
          <div class="m-1">Minutes</div>
        </div>
        <div id="timerSecond" class="d-flex flex-column">
          <div class="px-3 py-2 display-2">{this.props.seconds < 10 ? '0' + this.props.seconds : this.props.seconds}</div>
          <div class="m-1">Seconds</div>
        </div>
      </div>
    );
  }
}

export default Timer;
