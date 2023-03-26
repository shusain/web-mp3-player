const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const musicFolder = process.argv[2] || './music';

app.use(express.static('public'));

app.get('/tracks', (req, res) => {
  fs.readdir(musicFolder, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading tracks');
      return;
    }

    const tracks = files
      .filter((file) => path.extname(file).toLowerCase() === '.mp3')
      .map((file) => ({
        title: path.basename(file, '.mp3'),
        filename: file,
      }));

    res.json(tracks);
  });
});

app.get('/tracks/:filename', (req, res) => {
  const filePath = path.join(musicFolder, req.params.filename);
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
