var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

console.log("testing evn - ", process.env.PORT)


// Controllers
var Applications = require('./api/controllers/applicationCtrl');
var User = require('./api/controllers/UserCtrl');

// Model
UserModel = require('./api/models/userModel');

var port = 80;
app.set('port', process.env.PORT || port);

mongoose.connect('mongodb://localhost/bellco');

// Middle ware
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(session({
    secret: 'test123'
}));

function loggedIn(req, res, next) {
    if ( !req.isAuthenticated() ) return res.status(500).send('Not Authenticated')
    next();
}

// Passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password'

  }, function(username, password, done) {

    UserModel.findOne({ email: username })
    .exec()
    .then(function(user) {
        
        console.log('User found with: ', user);

        if (!user) {
            var msg = 1
            return done(msg, false);
        }

        user.comparePassword(password).then(function(isMatch) {

            console.log('isMatch: ', isMatch);

            if (!isMatch) {
                var msg = 2
                return done(msg, false);
            }

            return done(null, user);

        });

    });

}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Test API
app.get('/api/test', function (req, res) { res.send("testing working");});


// Post Requests
app.post('/api/application', Applications.save);
app.post('/api/application/filter', Applications.getBy);
app.post('/api/user/new', User.newUser);

app.post('/api/login', passport.authenticate('local'), function(req, res) {
    res.status(200).json(req.user);
});





// Get Requests
app.get('/api/application/', Applications.get);
app.get('/api/application/:id',loggedIn, Applications.getByID);
app.get('/api/user/:id',loggedIn, User.getUser);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#/login');
});

app.listen(port, function () {
    console.log("Listing on port ", port)
});

//delete
app.delete('/api/application/:id', Applications.deleteApp);