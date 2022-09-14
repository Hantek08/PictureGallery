const express = require('express');
const formidable = require('formidable');
const path = require("path");
const fs = require("fs");
const cors = require('cors');

// const libraryDir = "app-data";
// const applicationDir = path.resolve('./');
// const libraryJsonPath = 'app-data/library/picture-library.json';

const app = express();

app.use(cors());

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000 ...');
});