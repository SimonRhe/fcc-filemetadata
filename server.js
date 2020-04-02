//
//
// File Metadata for freeCodeCamp
// by Simon Rhe, April 2020
//
//


'use strict';

const express = require('express');
const cors = require('cors');
const multer  = require('multer');

const app = express();
const upload = multer(); // options object {dest: 'uploads/'} ommitted so that files are not written to disk

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// User story: When I submit something, I will receive the file
// name, and size in bytes within the JSON response.
// example: {"name":"testfile.txt","type":"text/plain","size":31}
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
