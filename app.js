const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Index');
});

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
