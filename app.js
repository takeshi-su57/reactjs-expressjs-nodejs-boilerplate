// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var path = require('path');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');

var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var xml2js = require('xml2js');
var _ = require('underscore');
var config = require('./config');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function(){
console.info('Error: There seems to be a problem connection to MongoDB.');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 |--------------------------------------------------------------------------
 |              Place to put all the api calls for the webapp.
 |--------------------------------------------------------------------------
 app.get('/api/',function(req,res,next){});
 */

/*
 |--------------------------------------------------------------------------
 |   Custom Middleware to ensure Reactjs routing using react-router.
 |--------------------------------------------------------------------------
 */
app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
        var page = res.render('index', { title: 'Testing' });
        res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
