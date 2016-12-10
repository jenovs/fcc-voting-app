'use strict'

require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const router = require('./routes/routes');
const {mongoose} = require('./db/mongoose');
const setUpPassport = require('./setuppassport');

setUpPassport();

const app = express();
const port = process.env.PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// parse data in POST and PATCH request bodies and add to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.disable('x-powered-by');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// These next both are invoked on each request
// This calls serializeUser
app.use(passport.initialize());
// Calls deserializeUser on each request and populates req.user
app.use(passport.session());

app.use('/', router)

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = {app}
