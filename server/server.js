const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const app = express();

const MONGO_URI = '';
mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoDB instance.'))
  .on('error', (error) => console.log('Error connecting to MongoDB:', error));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: '19t61joa9sll29ingoaompsp',
    store: new MongoStore({
      url: MONGO_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

const webPackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack ');
const webpackConfig = require('../webpack.config');
app.use(webPackMiddleware(webpack(webpackConfig)));

module.exports = app;
