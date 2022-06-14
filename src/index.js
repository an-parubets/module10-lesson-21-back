#! /usr/bin/env node

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err;
});

require('./config/env');

const cors = require('cors');
const express = require('express');
const createArticlesAPI = require('./articles');

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // Notice express.json middleware

createArticlesAPI(app);

app.listen(PORT, () => {
  console.log(`Easy echo server listening on port ${PORT}`);
});
