var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/**
 * setting database as postgres sql
 */
const {Pool, Client } = require('pg');
const pool = new Pool({
    user: 'techbuddies',
    host: 'mystore.ck1wujocvz7c.us-west-2.rds.amazonaws.com',
    database: 'mystore',
    password:'changeme123',
});

pool.query('SELECT * FROM filings.sp_next_filing_state()', (err, res) => {
    if (err) {
        console.log(err);
    }
  /*
    fs.readFile('dbOutput.json', (err, data) => {
      if(err) ( console.log(err));
      var newData = JSON.parse(data);
      fs.appendFile('dbOutput.json', res.rows[0].o_state);

    });
    */
     
   fs.appendFile('dbOutput.json', JSON.stringify(res.rows[0]),(err, done) => {
      if(err){
        console.log(err);
      }  
      console.log(res)  ;
      console.log('done');
    });
    
    // console.log(res);
    pool.end();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
