const express = require('express');
const multer = require('multer');
const parseAndSaveXLSX = require('../parseXLSX');

const router = express.Router();

// Multer setup for file uploading
const upload = multer({ dest: 'uploads/' }); // Files will be uploaded to the 'uploads' folder

router.post('/upload-xlsx', upload.single('file'), (req, res) => {
  const fileName = req.file.filename;  // Get uploaded file name

  // Parse and save data from the uploaded .xlsx file
  parseAndSaveXLSX(fileName)
    .then(() => res.status(200).json({ message: 'File uploaded and processed successfully' }))
    .catch((error) => res.status(500).json({ message: 'Error processing file', error: error.message }));
});

module.exports = router;
