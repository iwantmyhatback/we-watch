import React from 'react';
import { hot } from 'react-hot-loader/root';

class Player extends React.Component {
  // constructor(props) {
  //   this.state = { video: null };
  // }
  render() {
    return (
      <React.Fragment>
        <video id="videoPlayer" controls>
          <source src="http://localhost:80/watch" type="video/mp4"></source>
        </video>
      </React.Fragment>
    );
  }
}

export default hot(Player);
