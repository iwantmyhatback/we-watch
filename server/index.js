const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const streamVideo = require('./streamVideo');

const app = express();
const listenPort = 80;
let currentTime = 0;

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('/videos', (req, res) => {
  const directoryPath = path.join(__dirname, '../videos');
  fs.readdir(directoryPath, (error, videos) => {
    if (error) {
      console.log('!!! Error Reading Video Directory !!!');
    }
    res.send(videos);
  });
});

app.get('/watch/:currentVideo', (req, res) => {
  console.log(req);
  console.log(req.params.currentVideo);
  streamVideo(req, res, req.params.currentVideo);
});

app.listen(listenPort, () => {
  console.log('*** listening on 80 ***');
});
