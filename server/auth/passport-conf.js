const mongoose = require('mongoose');
const userSchema = require('../dal/models/user.model');
const User = mongoose.model('User', userSchema);
const bCrypt = require('bcrypt-nodejs');

const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);

const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

const passportHandlers = {

  signup: (req, userName, password, done) => {

    let hashedPassword = createHash(password);
    const newSignedUser = new User({ userName, password: hashedPassword, fullName: req.body.fullName });
    User.findOne({ userName })
      .then(user => {
        if (!user) {
          newSignedUser.save()
            .then(user => {
              return done(null, user);
            })
            .catch(err => {
              return done(err);
            })
        }
        if (user) {
          return done(null, false, { message: 'User exists' });
        }
      })
      .catch(err => {
        return done(err);
      });
  },
  login: (userName, password, done) => {
    User.findOne({ userName })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        if (!isValidPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      })
  },
  serializeUser: (user, done) => done(null, user),
  deserializeUser: (user, done) => done(null, user),
  validatedUser: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.sendStatus(401);
  }
}

module.exports = passportHandlers;