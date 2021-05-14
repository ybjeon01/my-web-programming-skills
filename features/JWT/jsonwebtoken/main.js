const jwt = require('jsonwebtoken')
const fs = require('fs')

function readKeyPair(path) {
    return {
        publicKey: fs.readFileSync(path.publicPath),
        privateKey: fs.readFileSync(path.privatePath)
    }
}

const KEY_PAIR_PATH = {
    publicPath: 'rsa_pub.pem',
    privatePath: 'rsa_priv.pem'
}

const JWT_OPTION = {
    "algorithm": "RS256"
}

const PAYLOAD = {
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": 1516239022
}

const keyPair = readKeyPair(KEY_PAIR_PATH)

// signing
// you cansee that it does not require header part of jwt because it abtract
// the header part and automatically make it inside the sign function
const signedJWT = jwt.sign(
    PAYLOAD,
    keyPair.privateKey.toString(),
    JWT_OPTION
)

console.log(signedJWT)

// verifying
jwt.verify(
    signedJWT,
    keyPair.publicKey.toString(),
    JWT_OPTION,
    (err, payload) => {
        console.log(err)
        console.log(payload)
    }
)

