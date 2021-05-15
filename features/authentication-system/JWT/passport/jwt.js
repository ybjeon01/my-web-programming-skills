const jwt = require('jsonwebtoken')
const fs = require('fs')

const JWT_OPTION = {
    "algorithm": "RS256"
}


PUBLIC_PATH = 'rsa_pub.pem'
PRIVATE_PATH = 'rsa_priv.pem'

const publicKey = fs.readFileSync(PUBLIC_PATH, 'utf-8')
const privateKey = fs.readFileSync(PRIVATE_PATH, 'utf-8')

module.exports = {
    sign: (payload) => {
        return jwt.sign(
            payload,
            privateKey,
            JWT_OPTION
        )
    },
    verify: (token) => {
        try {
            return jwt.verify(
                token,
                publicKey,
                JWT_OPTION
            )
        } catch (err) {
            console.log(err)
            return null
        }
    }

}