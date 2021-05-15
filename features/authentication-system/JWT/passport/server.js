const passport = require('passport')
const passportJwt = require('./passportJwt')

// configure passport and passport-JWT
passportJwt(passport)

const express = require('express')
const app = express()

app.use(express.json())

const jwt = require('./jwt')

app.get(
    '/',
    (req, res) => {
        const token = jwt.sign({
            iss: 'localhost',
            aud: 'user',
            sub: 'tester',
            expiresIn: '1d'
        })
        const payload = jwt.verify(signedJwt)
        res.send({
            token: token,
            payload: payload
        })
    }
)

app.get(
    '/check',
    (req, res) => {
        const [keyword, token] = req.headers['authorization'].split(' ')
        const payload = jwt.verify(token)
        res.send({
            payload: payload
        })
    }
)

app.get(
    '/protected',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.send('hello, you are authenticated')
    }
)

app.listen(3000)