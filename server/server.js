require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/routes');
const {mongoose} = require('./db/mongoose');

const app = express();

// parse data in POST and PATCH request bodies and add to req.body
app.use(bodyParser.json());

app.disable('x-powered-by');

// app.get('/', (req, res) => {
// });

app.use('/v1', router)

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

module.exports = {app}
