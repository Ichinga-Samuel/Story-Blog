const path = require('path');

const express = require('express');
const dotenv  = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const passport = require('passport');
const pug = require('pug');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectDB = require('./config/db');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const storiesRouter = require('./routes/stories');
const adminRouter = require('./routes/admin');

const app = express();

// setting up config files
dotenv.config({path:'./config/config.env'});
const PORT = process.env.PORT || 5000;

// connecting to Mongo Database
connectDB();

// Passport Config
strategy = require('./config/passport');
strategy.google(passport);


// View Engine
app.set('view engine', 'pug');

// Body Parsers for Form data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

strategy.local(passport);

// Method Override
app.use(methodOverride(function(req, res, next){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        const method = req.body._method;
        delete req.body._method;
        // next();
        return method;
    }
}));

// Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
    // cookie: {secure: true}
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting Global var
app.use(function(req, res, next){
    res.user = req.user || null;
    next()
});

// Morgan Middleware to be used in Development Only
if(process.env.NODE_ENV==='development'){app.use(morgan('dev'))}

// Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stories', storiesRouter);
app.use('/admin', adminRouter);

// static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV}  mode on ${PORT}`));