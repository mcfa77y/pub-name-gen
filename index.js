var express = require('express');
var exphbs = require('express-handlebars');
var helpers = require('./lib/helpers');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var session = require('express-session');
var mongoose = require('mongoose');
var compression = require('compression')

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var GOOGLE_CLIENT_ID = "473120167515-ln8esth9olnuljlr4g0tf0gcuadgr56a.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "d8uUYyZSQbWyAh0rC-7hGGSJ";

var Utils = require('./lib/utils');


var routes = require('./routes/index');
var users = require('./routes/users');
var pub = require('./routes/pub');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
// https://pub-name-gen.herokuapp.com/oauth2callback
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:5000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function() {

            // To keep the example simple, the user's Google profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Google account with a user record in your database,
            // and return that user instead.
            return done(null, profile);
        });
    }
    ));

var app = express();

var Handlebars = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: helpers

});
// view engine setup
app.engine('.hbs', Handlebars.engine);
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true
    }
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('shared/templates/', {
        cache: app.enabled('view cache'),
        precompiled: true
    }).then(function(templates) {
            // RegExp to remove the ".handlebars" extension from the template names.
            var extRegex = new RegExp(hbs.extname + '$');

            // Creates an array of templates which are exposed via
            // `res.locals.templates`.
            templates = Object.keys(templates).map(function(name) {
                return {
                    name: name.replace(extRegex, ''),
                    template: templates[name]
                };
            });

            // Exposes the templates during view rendering.
            if (templates.length) {
                res.locals.templates = templates;
            }

            setImmediate(next);
        })
    .catch(next);
}

// must be set before routes
app.use(compression());

app.use('/', pub);
app.use('/users', users);
// app.use('/pub', pub);


app.get('/account', Utils.ensureAuthenticated, function(req, res) {
    res.render('account', {
        user: req.user
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }),
    function(req, res) {
        // The request will be redirected to Google for authentication, so this
        // function will not be called.
    });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function(req, res, next) {
        console.log('logged in: ' + next);
        // res.redirect('/');
        res.render('pub', {
            user: req.user
        });
    });

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });

    // hbsPrecompiler = require('handlebars-precompiler');
    // hbsPrecompiler.watch(
    //     __dirname + "/shared/templates",
    //     __dirname + "/public/javascripts/templates.js", {
    //         extensions: ['handlebars', 'hbs'],
    //         min: false
    //     });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

Handlebars.getPartials().then(function(partials) {
    // console.log(partials);
    // => { 'foo/bar': [Function],
    // =>    title: [Function] }
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
    // console.log('Node app is running on port', app.get('port'));
});


module.exports = app;