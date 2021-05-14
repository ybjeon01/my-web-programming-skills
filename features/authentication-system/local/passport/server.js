// to save username and password to database
// this is used by authenticate function which is inserted to passport
const mongoose = require('mongoose');

// set mongoose database
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// Database User schema
let User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
});

User = mongoose.model('User', User)

// to validate password given by client
// for security reason, password is not saved as plain text.
// instead it uses one-way function to encrypt password and save it to database
const crypto = require('crypto');

// this method should not be in prototype
User.generate_password_hash = (password) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    }
}

User.prototype.validate_password = function (password) {
    console.log(this);
    console.log(this.salt)
    console.log(this.password_hash)
    const new_hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
    return new_hash === this.password_hash;
}

const passport = require('passport');
// username, password strategy
const LocalStrategy = require('passport-local').Strategy;

// it seems like passport is a singleton.
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    // user authentication function
    async function(username, password, done) {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                // null: no error
                // false: fail to authenticate
                return done(null, false);
            }
            else if (!user.validate_password.call(user, password)) {
                return done(null, false);
            }
            // save user object to client session
            return done(null, user);
        }
        catch (err) {
            // let passport process the error
            done(err)
        }
    }
));

// passport requires serialize and deserialize functions 
// otherwise, passport will throw error when you login
passport.serializeUser((user, done) =>{
    done(null, user.id);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    }
    catch (err) {
        done(err)
    }
});

const express = require('express');

const app = express();

// default settings for app
// view engine
app.set('view engine', 'ejs');

// middleware
// post request's body handler
// without setting this middleware, callback function of passport authentication is not called
// because passport immediately return rejection response
app.use(express.urlencoded({ extended: false }));


// passport-local strategy depends on express-session
// to save authenticated client info to session
const session = require('express-session');

// passport local strategy use session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // secure option let server set cookie for only https connection
}));

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    // if user is authenticated, you can see that passport key in session
    console.log(req.session)
    console.log()
    // after succesffuly loged in, passport set req.user to user which was deserialized
    // and this work is doen in passport.session() middleware
    // because passport.session() middleware iterate all strategies and let them do session-related works
    console.log(req.user)
    if (req.user)
        username = req.user.username
    else
        username = 'anonymous' 
    res.render('index.ejs', {user: username})
})

// Even you are already logged in, you can stil log in again
app.post(
    '/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: false 
    })
)

// Even you are already logged in, you can still register a new user
// if you register a new user, passport remove you from authenticated session list
// regardless of your login state
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let user = await User.findOne({username: username})
    if (user) {
        res.redirect('/');
    }

    data = User.generate_password_hash(password);
    
    user = new User({
        username: username,
        password_hash: data['hash'],
        salt: data['salt']
    })

    await user.save();
    res.redirect('/');
})

app.listen(3000);