const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./routers/user-route');
const videoRouter = require('./routers/video-route');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportConfig = require('./auth/passport-conf');
const env = require('./env/development-env');
const { userParsed } = require('./logic/parsers/mongo-parser')

passport.use('local', new LocalStrategy(passportConfig.login));
passport.use('local-sign', new LocalStrategy({
  passReqToCallback: true
}, passportConfig.signup));
passport.serializeUser(passportConfig.serializeUser);
passport.deserializeUser(passportConfig.deserializeUser);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  name: 'chromecast_cookie',
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 60 * 12
  },
  store: new MongoStore({
    url: process.env.CONNECTION_STRING
  })
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('src'));
app.use('/video', videoRouter);
app.use('/user', userRouter);


app.post('/signup', (req,res,next) => passport.authenticate('local-sign', (err, response) => {
  if (!response) {
    res.json('user exists');
  } else {
    req.body = response;
    return req.login(response, err=> {
      if (err) { 
        return next(err);
       }
      res.json(userParsed(response));
    });
  };  
})(req, res, next))

app.post('/login', (req,res,next) => passport.authenticate('local', (err, user) => {
  if (!user) {
    res.json('user does not exist');
  } else {
    req.body = user;
    return req.login(user, err=> {
      if (err) { 
        return next(err);
       }
      res.json(userParsed(user));
    });
  };  
})(req, res, next))


app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    req.logout();
    res.redirect('/');
  });
});

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`server is up and running on port ${process.env.DEVPORT}`)
    app.listen(process.env.DEVPORT);
  }
  catch (err) {
    console.log(`server down due to ${JSON.stringify(err)}`)
    throw (err);
  }

}

connectAndStartServer();