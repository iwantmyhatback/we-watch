import React from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
    };
    this.videoClick = this.videoClick.bind(this);
  }

  componentDidMount() {
    axios.get('/videos').then((data) => {
      this.setState({ videos: data.data });
    });
  }

  videoClick(event) {
    console.log(event.target.id);
    axios.get(`/watch/${event.target.id}`);
    this.props.newVideo(event.target.id);
  }

  render() {
    return (
      <React.Fragment>
        {this.state.videos.map((video, idx) => {
          if (video !== '.DS_Store') {
            let videoDisplay = video.slice(0, video.length - 4);
            videoDisplay = videoDisplay.replace(/\./g, ' ');
            return (
              <React.Fragment>
                <br />
                <div id={video} onClick={this.videoClick} key={idx}>
                  {videoDisplay}
                </div>
                <br />
              </React.Fragment>
            );
          }
        })}
      </React.Fragment>
    );
  }
}

export default Videos;
