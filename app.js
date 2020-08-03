const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database/database');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

// Database Connect Check
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

const app = express();
const port = process.env.PORT || 5000;
const jobs = require('./routes/jobs');

app.use(express.static(path.join(__dirname, 'public')));
app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { layout: 'landing' });
});

app.use('/jobs', jobs);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
