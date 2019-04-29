// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;

// Initialize Server
const app = express();

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
app.use(express.static('./public'));
