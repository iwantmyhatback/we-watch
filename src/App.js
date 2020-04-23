import React from 'react';
import Videos from './Videos.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 'Rick.And.Morty.S01.E01.mp4' };

    this.newVideo = this.newVideo.bind(this);
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
