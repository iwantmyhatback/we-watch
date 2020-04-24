import React from 'react';
import Videos from './Videos.js';
import axios from 'axios';

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
    this.handleChange = this.handleChange.bind(this);
  }

  setListeners() {
    document.getElementById('videoPlayer').addEventListener('seeking', this.handleChange);
    document.getElementById('videoPlayer').addEventListener('play', this.handleChange);
    document.getElementById('videoPlayer').addEventListener('pause', this.handleChange);
  }

  removeListeners() {
    document.getElementById('videoPlayer').removeEventListener('seeking', this.handleChange);
    document.getElementById('videoPlayer').removeEventListener('play', this.handleChange);
    document.getElementById('videoPlayer').removeEventListener('pause', this.handleChange);
  }

  handleChange(event) {
    console.log(event.target.currentTime);
    this.setState({ seconds: event.target.currentTime });
  }

  componentDidUpdate() {
    this.setListeners();
  }

  UNSAFE_componentWillUpdate() {
    this.removeListeners();
  }

  componentDidMount() {
    this.setListeners();
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
