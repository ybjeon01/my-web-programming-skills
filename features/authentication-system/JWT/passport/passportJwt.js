const fs = require('fs')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: fs.readFileSync('rsa_pub.pem', 'utf-8'),
    issuer: 'localhost',
    audience: 'user',
    algorithms: ['RS256']
}

const auth_handler = (payload, done) => {
    console.log('auth_handler')
    console.log(payload)

    if (!payload.sub) {
        return done(null, payload.sub)
    }
    return done(null, false)
}

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(
            opts,
            auth_handler,
        )
    )       
}