let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
//let cors = require('cors');


// Mudule for Authentication
let session = require('express-session');
let passport = require('passport');
/*
let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;
*/
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');



// database setup 
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true });

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', ()=>{
  console.log('Connected to Mongo...');
});

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey');
let userSurveyRouter = require('../routes/survey')
const { Mongoose } = require('mongoose');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup Express Session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user modulte
//create a user module instance 
 let userModule = require('../models/user');
 let User = userModule.User;

 // implent a user authentication strategy
 passport.use(User.createStrategy());

 // serialize and deserialize the user info
 passport.serializeUser(User.serializeUser());
 passport.deserializeUser(User.deserializeUser());

 /* this part for JWT if we want go to ANGULAR framework */
/*
 let JWTOptions = {};
  JWTOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
  JWTOptions.secretOrKey = DB.secret;

  let strategy = new JWTStrategy(JWTOptions, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
  });

  passport.use(strategy);
 */

 //routing 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey-list', surveyRouter);
app.use('/userSurvey', userSurveyRouter);


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
  res.render('error' , {title: 'Error'});
});

module.exports = app;
