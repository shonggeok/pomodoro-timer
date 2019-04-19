import React, { Component } from 'react';
import Timer from './Timer';
import Alarm from './assets/alarm.mp3';

class Pomodoro extends React.Component {
  constructor(props) {
    let workDuration = 25;
    let breakDuration = 5;
    super(props);
    this.state = {
        timerHasStarted: false,
        workTimerHasStarted: false,
        breakTimerHasStarted: false,
        hasPaused: false,
        workDuration: workDuration * 60,
        breakDuration: breakDuration * 60,
        duration: workDuration * 60,
        remainingMinutes: workDuration,
        remainingSeconds: 0
    }

    this.baseState = this.state;
    this.timer = null;

    this.toggleTimer = this.toggleTimer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.ticktock = this.ticktock.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    this.sound = new Audio(Alarm);
  }

  componentWillUnmount() {
  }

  toggleTimer() {
    if (!this.state.timerHasStarted) {
      this.setState({
        timerHasStarted: true,
        workTimerHasStarted: true
      });
    }

    if (!this.state.hasPaused) {
      this.ticktock();
      this.setState({
        hasPaused: true
      });
    } else {
      clearInterval(this.timer);
      this.setState({
        hasPaused: false
      });
    }

  }

  switchTimer() {
    this.playSound();
    this.setState({
      workTimerHasStarted: !this.state.workTimerHasStarted,
      breakTimerHasStarted: !this.state.breakTimerHasStarted,
    });

    let duration = this.state.workTimerHasStarted ? this.state.workDuration : this.state.breakDuration;

    this.setState({
      duration: duration + 1
    });

    this.ticktock();
  }

  ticktock() {
    this.timer = setInterval(() => {
      if (this.state.duration <= 0) {
        clearInterval(this.timer);
        this.switchTimer();
      }

      this.setState({
        duration: this.state.duration - 1
      });
      let remainingMinutes = this.state.duration / 60 | 0;
      let remainingSeconds = this.state.duration % 60 | 0;

      this.setState({
        remainingMinutes: remainingMinutes,
        remainingSeconds: remainingSeconds
      });
    }, 1000);
  }

  playSound() {
    this.sound.play();
  }

  resetTimer() {
    clearInterval(this.timer);
    this.setState(this.baseState);
  }

  render() {
    return (
      <div className="d-flex vh-100 flex-row justify-content-center align-items-center text-center">
        <div className="d-flex flex-column p-5 bg-dark text-light justify-content-center align-items-center">
          
          <Timer minutes={this.state.remainingMinutes} seconds={this.state.remainingSeconds} />

          <div id="buttonDisplay" class="d-flex flex-row m-1">
            <button className="btn btn-dark btn-outline-light p-1 mx-1 my-2" onClick={this.toggleTimer}>{!this.state.timerHasStart && !this.state.hasPaused ? 'Start' : 'Pause'}</button>
            <button className="btn btn-dark btn-outline-light p-1 mx-1 my-2" onClick={this.resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Pomodoro;