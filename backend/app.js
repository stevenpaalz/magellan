var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const debug = require('debug');

const cors = require('cors');
const { isProduction } = require('./config/keys');
const csurf = require('csurf');
require('./models/User');
require('./models/Quest');
require('./models/Review');
require('./models/Event');
require('./config/passport');
const passport = require('passport');

const usersRouter = require('./routes/api/users');
const questsRouter = require('./routes/api/quests');
const reviewsRouter = require('./routes/api/reviews');
const eventsRouter = require('./routes/api/events');
const searchRouter = require('./routes/api/search')
const csrfRouter = require('./routes/api/csrf');
const openaiRouter = require('./routes/api/openai');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(passport.initialize());

if (!isProduction) {
    app.use(cors()); 
}

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

app.use('/api/users', usersRouter);
app.use('/api/quests', questsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/search', searchRouter);
app.use('/api/openai', openaiRouter);
app.use('/api/csrf', csrfRouter);

if (isProduction) {
  const path = require('path');
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  app.use(express.static(path.resolve("../frontend/build")));

  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});
  
const serverErrorLogger = debug('backend:error');

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
});

module.exports = app;