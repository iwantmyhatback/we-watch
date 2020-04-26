# WeWatch

### Video Syncing Across Multiple Clients Using Web Sockets
A breif experiment as a personal project, to host mp4 files on an [ExpresJS](https://expressjs.com/) server and stream them to the client as needed through a [fs.readStream](https://nodejs.org/api/fs.html#fs_class_fs_readstream). Then using [sockets](https://socket.io/) to transmit play status, elapsed time, and current file to the server, and have the server then respond over socket connection with commands to client video players syncing those transmitted video charactristics between both connected clients.
