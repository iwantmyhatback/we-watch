const path = require('path');
const fs = require('fs');

let streamVideo = function (req, res, currentVideo = 'Parks.And.Recreation.S01.E01.mp4') {
  const videoPath = path.join(__dirname, `../videos/${currentVideo}`);
  const videoStats = fs.statSync(videoPath);
  const videoSize = videoStats.size;
  const range = req.headers.range;

  console.log(currentVideo);
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
};

module.exports = streamVideo;
