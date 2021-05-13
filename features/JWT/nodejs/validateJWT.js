const base64url = require('base64url')
const crypto = require('crypto')
const fs = require('fs')

function readKeyPair(path) {
    return {
        publicKey: fs.readFileSync(path.publicPath),
        privateKey: fs.readFileSync(path.privatePath)
    }
}

// privateKey: private key of RSA algorithm
// message: plain text or any unencrypted data
// Unlike encrypting data, this function is for generating digial signature
// the data encrytped by private key can be decrypted by public key that
// every user should have
function encryptWithPrivateKey(privateKey, message) {
    const bufferMessage = Buffer.from(message, 'utf8');
    return crypto.privateEncrypt(privateKey, bufferMessage)
}

// publicKey: public key of RSA algorithm
// bufferedMessage: buffer object containing encrypted data
// this function is for validating digital signature
// this function can decrypt data that was encrypted by private key
function decryptWithPublicKey(publicKey, buffer) {
    return crypto.publicDecrypt(publicKey, buffer);
}

// message: plain text or data you want to hash
// algorithm: hash algorithm to use
// trapdoor function
// In this example, this function is used for generating digital signature
// and verifying signature
function hashMessage(message, algorithm) {
    const hash = crypto.createHash(algorithm);
    hash.update(message);
    const hashValue = hash.digest('hex')
    return hashValue;
}

const JWT = (
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZS' +
    'I6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZ' +
    'S82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExR' +
    'EkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQG' +
    'xHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8Ocaar' +
    'A8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618i' +
    'Yv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA'
)

const KEY_PAIR_PATH = {
    publicPath: 'rsa_pub.pem',
    privatePath: 'rsa_priv.pem'
}

const jwtParts = JWT.split('.')
const header = base64url.decode(jwtParts[0])
const payload = base64url.decode(jwtParts[1])
const signature = base64url.toBuffer(jwtParts[2])

console.log(header)
console.log(payload)
console.log(signature)

const keyPair = readKeyPair(KEY_PAIR_PATH)
const decryptedHashValue = decryptWithPublicKey(keyPair.publicKey, signature);

// remeber that hash is not text. It is binary data
// Since hashMessage convert the binary data to hex encoded string,
// decryptedHashValue also needs to be converted to hex encoded string 
const newHash = hashMessage(jwtParts[0] + '.' + jwtParts[1], 'SHA256')
console.log()

// The first portion of decryptedHashValue corresponds to the digest 
// ID of SHA-256, which is prepended in the case of PKCS1 v1.5 padding
// (RSASSA-PKCS1-v1_5, s. RFC8017), the default padding used by 
// privateEncrypt() and publicDecrypt().
const hash = decryptedHashValue.toString('hex')

console.log(hash)
console.log()
console.log(newHash)

if (hash.endsWith(newHash)) {
    console.log('verified!')
}