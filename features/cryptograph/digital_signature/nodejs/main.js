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
// this function can decrypted data that was encrypted by private key
function decryptWithPublicKey(publicKey, bufferMessage) {
    return crypto.publicDecrypt(publicKey, bufferMessage);
}

// message: plain text or data you want to hash
// algorithm: hash algorithm to use
// trapdoor function
// In this example, this function is used for generating digital signature
// and signature validation
function hashMessage(message, algorithm) {
    const hash = crypto.createHash(algorithm);
    hash.update(message);
    const hashValue = hash.digest('hex')
    console.log(hashValue);
    return hashValue;
}

// message: plain text
// algorithm: hash algorithm to use
// private key: private key of RSA algorithm
// generate digital signature that can be validated by receiver
function getDataWithSignature(message, algorithm, privateKey) {
    const hashValue = hashMessage(message, algorithm);
    const encryptedData = encryptWithPrivateKey(privateKey, hashValue);
    return {
        message,
        encryptedData,
        algorithm
    };
}

// data: data that contains plain text, hash value encrypted by private key,
//       and hash algorithm used for the encrypted hash value
// public key: RSA algorithm public key that will be used for decrypting the 
//             encrypted hash value
function validateDataWithSignature(data, publicKey) {
    const hashValue = hashMessage(data.message, data.algorithm);
    const decryptedHashValue = decryptWithPublicKey(publicKey, data.encryptedData);

    return hashValue === decryptedHashValue.toString()
}

// __main__ 
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


// assume that from here receiver got the data from sender
// decrypt and print decrypted text
const valid = validateDataWithSignature(dataWithSig, keyPair.publicKey);
console.log('valid: ' + valid);
