const express = require('express');
const session = require('express-session');

let app = express();

// default settings for app
// view engine
app.set('view engine', 'ejs');

// middleware
// post request's body handler
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // secure option let server set cookie for only https connection
}))

app.get('/', (req, res) => {
    console.log(req.session);
    if (req.session.name === undefined) {
        req.session.name = 'anonymous';
    }
    res.render('index', {session: req.session});
});

app.post('/', (req, res) => {
    console.log(req.body.name);
    req.session.name = req.body.name; // save name to session
    res.redirect('/');
})

app.listen(3000);