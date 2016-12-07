require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/routes');
const {mongoose} = require('./db/mongoose');

const app = express();

// parse data in POST and PATCH request bodies and add to req.body
app.use(bodyParser.json());

app.disable('x-powered-by');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// app.get('/', (req, res) => {
// });

app.use('/v1', router)

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

module.exports = {app}
