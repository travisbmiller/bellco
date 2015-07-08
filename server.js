var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;




// Controllers
var Applications = require('./api/controllers/applicationCtrl');
var User = require('./api/controllers/UserCtrl');

// Model
UserModel = require('./api/models/userModel');

var port = process.env.PORT || 9001;
//app.set('port', process.env.PORT || port);

mongoose.connect('mongodb://localhost/bellco');

// Middle ware
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(session({
    secret: 'test123'
}));

function loggedIn(req, res, next) {
    if ( !req.isAuthenticated() ) return res.status(401).send('Not Authenticated')
    next();
}

// Passport 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    
    usernameField: 'email',
    passwordField: 'password'

  }, function(username, password, done) {

    UserModel.findOne({ email: username }, function(err, user) {
         if (err) { 
            console.log(err)
            return done(err); 
        }
        
        console.log('User found with: ', user);

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        user.comparePassword(password).then(function(isMatch) {


            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
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



// Post Requests
app.post('/api/application', Applications.save);
app.post('/api/application/filter', Applications.getBy);
app.post('/api/user/new', loggedIn, User.newUser);
app.post('/api/application/seen/:id', Applications.seen)
// app.post('/api/login', passport.authenticate('local', function(req, res, next, info) {
//     console.log(req)
//     console.log(next)
//     res.status(200).json(req.user);
// }))

app.post('/api/login', function(req, res, next) {
    console.log("hit api");
    
  // generate the authenticate method and pass the req/res
  passport.authenticate('local', function(err, user, info) {
    console.log("err ", err)
    console.log("user ", user)
    console.log("user ", user)

    if (err) {  
        console.log("we had a error")
        return next(err); 
    }

    if (info) {
        console.log(info.message)
        return res.status(401).json(info.message);
        
    }

    req.login(user, {}, function(err) {
                if (err) { return next(err) };
                return res.send("working");
            });

    // console.log(req.user);
    // res.status(200).json(user);
  })(req, res, next);

});





// Get Requests
app.get('/api/application/', loggedIn, Applications.get);
app.get('/api/application/:id',loggedIn, Applications.getByID);
app.get('/api/user/:id',loggedIn, User.getUser);
app.get('/login', function(req, res) {
    res.redirect('/#/login');
})

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/#/login');
});

app.listen(port, function () {
    console.log("Listing on port ", port)
});

//delete
app.delete('/api/application/:id', Applications.deleteApp);




// send the message and get a callback with an error or details of the message that was sent




app.get('/*', function(req, res) {
  res.redirect('/');
});