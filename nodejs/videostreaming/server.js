// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('stream', (data) => {
    console.log('Receiving stream data');
    
    // Convert the incoming stream data to iOS-compatible format
    const videoBuffer = Buffer.from(data);
    
    ffmpeg()
      .input(videoBuffer)
      .outputOptions([
        '-f mp4',
        '-movflags frag_keyframe+empty_moov',
        '-profile:v baseline', // Important for iOS compatibility
        '-level 3.0',
        '-pix_fmt yuv420p', // Required for iOS
        '-preset ultrafast',
        '-tune zerolatency'
      ])
      .toFormat('mp4')
      .on('error', (err) => {
        console.error('FFmpeg error:', err);
      })
      .on('end', () => {
        console.log('FFmpeg processing finished');
      })
      .pipe()
      .on('data', (processedData) => {
        // Emit the processed video stream
        socket.broadcast.emit('stream', processedData);
      });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
