# What does program show?

1. main.js creates public and private key
2. main.js hashes the plain text with sha256 hash algorithm and encrypt the hash value with private key
3. send the encryped data with plain text and what hash algorithm is used to receiver
4. receiver hash the plain text with hash algorithm and decrypt the encrypted value with public key
5. receiver compares the decrypted hash value with hash value generated in reciever side
6. Then program prints the result.

# Tutorial

https://www.youtube.com/watch?v=F-sFp_AvHc8&t=8144s

# How to use it

    # go to directory where main.js exists
    node main.js

# References

Utilize this references afer wathcing tutorial

* Why hash the message before signing it with RSA?

    * https://crypto.stackexchange.com/questions/12768/why-hash-the-message-before-signing-it-with-rsa/

* Example use case of signature using RSA   

    * https://crypto.stackexchange.com/questions/52822/example-use-case-of-signature-using-rsa

* Application of digital signature

    * (digital certificate) https://en.wikipedia.org/wiki/Public_key_certificate

# Test

# What's next?

* Make your own digital certificate(X.509) and utilize it to your https server.
* check if web browser can communicate with your https server safely only with the server's public key. I mean, try communication without certificate made by trusted third party.
