import React, { Component } from 'react';
import Timer from './Timer';
import Alarm from './assets/alarm.mp3';

class Pomodoro extends React.Component {
  workDuration = 25;
  breakDuration = 5;

  state = {    
    timerHasStarted: false,
    workTimerHasStarted: false,
    breakTimerHasStarted: false,
    hasPaused: false,
    workDuration: this.workDuration * 60,
    breakDuration: this.breakDuration * 60,
    duration: this.workDuration * 60,
    remainingMinutes: this.workDuration,
    remainingSeconds: 0
  }

  baseState = this.state;

  componentDidMount() {
    this.sound = new Audio(Alarm);
  }

  toggleTimer = () => {
    if (!this.state.timerHasStarted) {
      this.setState({
        timerHasStarted: true,
        workTimerHasStarted: true
      });
    }

    let paused;

    if (!this.state.hasPaused) {
      this.ticktock();
      paused = true;
    } else {
      clearInterval(this.timer);
      paused = false;
    }

    this.setState({
      hasPaused: paused
    });

  }

  switchTimer = () => {
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

  ticktock = () => {
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

  playSound = () => {
    this.sound.play();
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState(this.baseState);
  }

  render() {
    return (
      <div className="d-flex vh-100 flex-row justify-content-center align-items-center text-center">
        <div className="d-flex flex-column p-5 bg-dark text-light justify-content-center align-items-center">
          
          <Timer minutes={this.state.remainingMinutes} seconds={this.state.remainingSeconds} />

          <div id="buttonDisplay" className="d-flex flex-row m-1">
            <button className="btn btn-dark btn-outline-light p-1 mx-1 my-2 user-action" onClick={this.toggleTimer}>{!this.state.timerHasStart && !this.state.hasPaused ? 'Start' : 'Pause'}</button>
            <button className="btn btn-dark btn-outline-light p-1 mx-1 my-2 user-action" onClick={this.resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
