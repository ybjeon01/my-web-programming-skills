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

function encryptWithPrivateKey(privateKey, message) {
    const bufferMessage = Buffer.from(message, 'utf8');
    return crypto.privateEncrypt(privateKey, bufferMessage)
}

function decryptWithPublicKey(publicKey, bufferMessage) {
    return crypto.publicDecrypt(publicKey, bufferMessage);
}

function hashMessage(message, algorithm) {
    const hash = crypto.createHash(algorithm);
    hash.update(message);
    const hashValue = hash.digest('hex')
    console.log(hashValue);
    return hashValue;
}

function getDataWithSignature(message, algorithm, privateKey) {
    const hashValue = hashMessage(message, algorithm);
    const encryptedData = encryptWithPrivateKey(privateKey, hashValue);
    return {
        message,
        encryptedData,
        algorithm
    };
}

function validateDataWithSignature(data, publicKey) {
    const hashValue = hashMessage(data.message, data.algorithm);
    const decryptedHashValue = decryptWithPublicKey(publicKey, data.encryptedData);

    return hashValue === decryptedHashValue.toString()
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
const hashAlgorithm = 'sha256';

console.log('Text to encrypt: ' + plainText);
console.log('hash algorithm: ' + hashAlgorithm);

const dataWithSig = getDataWithSignature(plainText, hashAlgorithm, keyPair.privateKey);


// make digital signature and make a form that 
console.log('data with signature: ');
console.log(JSON.stringify(dataWithSig));

// decrypt and print decrypted text
const valid = validateDataWithSignature(dataWithSig, keyPair.publicKey);
console.log('valid: ' + valid);
