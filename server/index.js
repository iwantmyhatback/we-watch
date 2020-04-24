const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const io = require('socket.io')(server);

const streamVideo = require('./streamVideo');

const listenPort = 80;

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
  // console.log(req);
  // console.log(req.params.currentVideo);
  streamVideo(req, res, req.params.currentVideo);
});

server.listen(listenPort, () => {
  console.log('*** listening on 80 ***');
});

let current = { current: null, seconds: null, play: null };

io.on('connection', (socket) => {
  socket.emit('check-request', current);
  console.log('EMITTED CHECK-REQUEST');

  socket.on('check-response', (data) => {
    console.log('RECEIVED CHECK-RESPONSE');
    console.log(current);
    current = data;
    console.log(current);
  });
  socket.on('playing', (data) => {
    console.log('RECEIVED PLAYING-REQUEST');
    console.log(current);
    current = data;
    console.log(current);

    socket.emit('check-request', current);
    console.log('EMITTED CHECK-REQUEST');
    socket.on('check-response', (data) => {
      console.log('RECEIVED CHECK-RESPONSE');
      console.log(current);
      current = data;
      console.log(current);
    });
  });
});
