var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var logger = require('morgan');
var cors = require('cors');

require('./configs/passport-config');

// localhost database connection
mongoose.connect('mongodb://localhost/TravelNext');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add session here
app.use(session({
	secret:"TravelNext",
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		credentials: true,					// allow other domains to send cookies
		origin: ["http://localhost:4200"]	// domains that are allowed....
	})
);


// ========== Routing ==========================
var index = require('./routes/index');
app.use('/', index);

var authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

var reviewRoutes = require('./routes/review-routes');
app.use('/', reviewRoutes);


// ==============================================


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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





