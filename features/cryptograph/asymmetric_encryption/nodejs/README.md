# What does program show?

main.js create public and private keys with RSA algorithm, and print encrypted text and decrypted text by using those keys.

# Tutorial

https://www.youtube.com/watch?v=F-sFp_AvHc8&t=8144s


# How to use it

    # go to directory where main.js exists
    node main.js

# References

Utilize this references afer wathcing tutorial

* https://nodejs.org/api/crypto.html#crypto_crypto_generatekeypairsync_type_options


# Test

* What happens if client trys to encrypt with private key and decrypt with public key?

    * Because of pem format, library stops to compute

* Then, what if you exchange contents of the pem files to fool the library?

    * still fails. It returns 'ERR_OSSL_ASN1_SEQUENCE_LENGTH_MISMATCH'

# What's next?

* Show that data is completely plain when client does not encrypt so session data or user-related information can be exposed.
* analyze data transmitted between clients under TLS 1.2 and 1.3 protocol by using sharkwire.