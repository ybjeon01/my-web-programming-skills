const crypto = require('crypto');
const fs = require('fs');

function generateKeyPair() {
    // keyPair object has generated public and private keys
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096, // Key size in bits,
        publicKeyEncoding: {
            type: 'pkcs1', // Public Key Cryptograph Standards 1
            format: 'pem', // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
    return keyPair; // contains only publicKey and privateKey values which are string. 
}

function saveKeyPair(keyPair, path) {
    fs.writeFileSync(path.publicPath, keyPair.publicKey);
    fs.writeFileSync(path.privatePath, keyPair.privateKey);
}

function readKeyPair(path) {
    return {
        publicKey: fs.readFileSync(path.publicPath),
        privateKey: fs.readFileSync(path.privatePath)
    }
}

function encryptWithPublicKey(publicKey, message) {
    const bufferMessage = Buffer.from(message, 'utf8');
    return crypto.publicEncrypt(publicKey, bufferMessage);
}

function decryptWithPrivateKey(privateKey, bufferMessage) {
    return crypto.privateDecrypt(privateKey, bufferMessage);
}

let keyPair = undefined;
const keyPath = {
    publicPath: 'id_rsa_pub.pem',
    privatePath: 'id_rsa_priv.pem',
}

try {
    // read public and private keys
    keyPair = readKeyPair(keyPath)
}
catch (e) {
    // create and save RSA key pair
    keyPair = generateKeyPair();
    saveKeyPair(keyPair, keyPath)
}

const plainText = 'Hello, World!';
console.log('Text to encrypt: ' + plainText)

// encrypt and print encrypted text
const encryptedData = encryptWithPublicKey(keyPair.publicKey, plainText);
console.log('encrypted text: ');
console.log(encryptedData.toString());

// decrypt and print decrypted text
const decryptedData = decryptWithPrivateKey(keyPair.privateKey, encryptedData);
console.log('decrypted text: ' + decryptedData.toString());
