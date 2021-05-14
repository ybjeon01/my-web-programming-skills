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

* Example use case of signature using RSA   

    * https://crypto.stackexchange.com/questions/52822/example-use-case-of-signature-using-rsa

* Application of digital signature

    * (digital certificate) https://en.wikipedia.org/wiki/Public_key_certificate

* Hash is not text! It's binary
    
    * https://stackoverflow.com/questions/67504916/tried-to-verify-jwt-signature-by-myself-in-nodejs-to-understnad-internal-working

# Notes:

* Why hash the message before signing it with RSA?

    * https://crypto.stackexchange.com/questions/12768/why-hash-the-message-before-signing-it-with-rsa/


* Why can't attacker in the middle of network modify the data with digital signature?

    attacker can modify the plain text in the data and make new hash for the text. However,
    it cannot re-gerenate encrypted hash value because it does not have private key. Genuine receiver can immediately notice that hash value of plain text is different from hash value in the encrypted data

* Is it ok to chop one big data and send those chunks with multiple digital signature one by one?

    No, Although attackers cannkt modify the original data, they can change the order of chunks
    or can intentionally drop some chunks. In many cases, this does not matter, but if that data have set of instructions, dropping or changing order is matter. Remeber that the data is
    still plain text that anyone can see. Digital signature is just for validation


# Test

# What's next?

* Make your own digital certificate(X.509) and utilize it to your https server.
* check if web browser can communicate with your https server safely only with the server's public key. I mean, try communication without certificate made by trusted third party.
