import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
  }

  componentDidMount() {
    axios.get('/videos').then((data) => {
      this.setState({ videos: data.data });
    });
  }

  render() {
    console.log(this.state.videos);
    return (
      <React.Fragment>
        {this.state.videos.map((video) => {
          if (video !== '.DS_Store') {
            video = video.slice(0, video.length - 4);
            return <body>{video.replace(/\./g, ' ')}</body>;
          }
        })}
      </React.Fragment>
    );
  }
}

export default hot(Videos);
