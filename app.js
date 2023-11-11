var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
const mongoose = require('mongoose')
////
const indexRouter = require('./routes/index');
////
process.env.TZ='UTC'
var app = express();
//เชื่ิอมdatabase
const urldatabase =process.env.ATLAS_MONGODB
mongoose.Promise = global.Promise
mongoose.connect(urldatabase).then(()=>console.log("connect")).catch((err)=>console.error(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//router
app.use('/', indexRouter);
app.use('/signup',require('./routes/signup'))
app.use('/signin',require('./routes/signin'))
app.use('/signout',require('./routes/signout'))
app.use('/admin',require('./routes/admin'))
app.use('/partner',require('./routes/partner'))
app.use('/member',require('./routes/member'))
app.use('/hotel',require('./routes/hotel'))
app.use('/room',require('./routes/room'))
app.use('/booking',require('./routes/booking'))
app.use('/checkin',require('./routes/checkin'))
app.use('/payment',require('./routes/payment'))
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
