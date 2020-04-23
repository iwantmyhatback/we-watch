const express = require('express');
const path = require('path');
const fs = require('fs');
const listenPort = 80;

const app = express();
let = availableVideos = [];
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

app.get('/watch', (req, res) => {
  const videoPath = path.join(__dirname, '../videos/rick.and.morty.s01.e01.mp4');
  const videoStats = fs.statSync(videoPath);
  const videoSize = videoStats.size;
  const range = req.headers.range;

  console.log(req.headers.range);
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
    const chunkSize = end - start + 1;
    const video = fs.createReadStream(videoPath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    video.pipe(res);
  } else {
    const head = {
      'Content-Length': videoSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

app.listen(listenPort, () => {
  console.log('*** listening on 80 ***');
});
