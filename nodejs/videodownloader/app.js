const express = require('express');
const app = express();
const PORT = 3000;

const getVideoDetail = require('./getVideoDetail');
const downloadVideos = require('./downloadVideos');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/videoDetail', async (req, res) => {
  const videoPageUrl = req.query.videoPageUrl;
  
  console.log('videoPageUrl', videoPageUrl);

  if (!videoPageUrl) {
    return res.status(400).send('Missing videoPageUrl query parameter');
  }
  try {
    const videoDetails = await getVideoDetail(videoPageUrl);
    console.log('videoDetails', videoDetails);
    res.send({ videoDetails });
  } catch (error) {
    res.status(500).send('Error retrieving VOD detail URL');
  }
});

app.post('/downloadVideos', async (req, res) => {
  const { videoPageUrl, tmdbName, season, start, end } = req.body;

  if (!videoPageUrl || !tmdbName || !season || !start || !end) {
      return res.status(400).send('Missing required form parameters');
  }

  try {
      await downloadVideos(videoPageUrl, tmdbName, season, parseInt(start), parseInt(end));
      res.send('Download started');
  } catch (error) {
      res.status(500).send(`Error starting download: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});