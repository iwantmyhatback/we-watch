import React from 'react';
import Videos from './Videos.js';
import axios from 'axios';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'Rick.And.Morty.S01.E01.mp4',
      seconds: 0,
      play: false,
    };

    this.newVideo = this.newVideo.bind(this);
    this.setListeners = this.setListeners.bind(this);
    this.removeListeners = this.removeListeners.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handleSeek.bind(this);
    this.sync = this.sync.bind(this);
  }

  sync() {
    const socket = io.connect('http://localhost');
    socket.on('check-request', (data) => {
      console.log('RECIEVED CHECK-REQUEST');
      if (data.current === null) {
        console.log('EMITTED CHECK-RESPONSE');
        socket.emit('check-response', {
          current: this.state.current,
          seconds: this.state.seconds,
          play: this.state.play,
        });
      } else {
        document.getElementById('videoPlayer').currentTime = data.seconds;
        if (data.play) {
          document.getElementById('videoPlayer').play();
        } else {
          document.getElementById('videoPlayer').pause();
        }
      }
    });
  }

  setListeners() {
    document.getElementById('videoPlayer').addEventListener('seeking', this.handleSeek);
    document.getElementById('videoPlayer').addEventListener('play', this.handlePlay);
    document.getElementById('videoPlayer').addEventListener('pause', this.handlePause);
    document.getElementById('videoPlayer').addEventListener('timeupdate', this.handlePause);
  }

  removeListeners() {
    document.getElementById('videoPlayer').removeEventListener('seeking', this.handleSeek);
    document.getElementById('videoPlayer').removeEventListener('play', this.handlePlay);
    document.getElementById('videoPlayer').removeEventListener('pause', this.handlePause);
    document.getElementById('videoPlayer').removeEventListener('timeupdate', this.handlePause);
  }

  handleTimeupdate(event) {
    console.log('timeupdate');
  }

  handleSeek(event) {
    // console.log(event.target.currentTime);
    this.setState({ seconds: event.target.currentTime });
    const socket = io.connect('http://localhost');
    socket.emit('playing', {
      current: this.state.current,
      seconds: this.state.seconds + 0.9,
      play: this.state.play,
    });
  }

  handlePlay(event) {
    console.log(event.target.currentTime);
    this.setState({ seconds: event.target.currentTime, play: true });
    const socket = io.connect('http://localhost');
    socket.emit('playing', {
      current: this.state.current,
      seconds: this.state.seconds + 0.9,
      play: this.state.play,
    });
  }

  handlePause(event) {
    console.log(event.target.currentTime);
    this.setState({ seconds: event.target.currentTime, play: false });
    const socket = io.connect('http://localhost');
    socket.emit('playing', {
      current: this.state.current,
      seconds: this.state.seconds + 0.9,
      play: this.state.play,
    });
  }

  componentDidUpdate() {
    this.setListeners();
  }

  UNSAFE_componentWillUpdate() {
    this.removeListeners();
  }

  componentDidMount() {
    this.setListeners();
    this.sync();
  }

  newVideo(newVideo) {
    this.setState({ current: newVideo });
  }

  render() {
    return (
      <React.Fragment>
        <h1>
          {this.state.current
            .slice(0, this.state.current.length - 4)
            .replace(/\./g, ' ')
            .replace(/ S0/g, ' Season 0')
            .replace(/ E0/g, ' Episode 0')}
        </h1>
        <video
          key={this.state.current}
          id="videoPlayer"
          src={`/watch/${this.state.current}`}
          type="video/mp4"
          width="50%"
          controls
        ></video>

        <Videos newVideo={this.newVideo} />
      </React.Fragment>
    );
  }
}

export default App;
