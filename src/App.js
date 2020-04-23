import React from 'react';
import { hot } from 'react-hot-loader/root';
import Player from './Player.js';
import Videos from './Videos.js';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Player />
        <Videos />
      </React.Fragment>
    );
  }
}

export default hot(App);
