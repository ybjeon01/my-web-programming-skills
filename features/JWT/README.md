# Reason to study Session

While studying authentication system, I found that it uses various features such as cookie, 
session, cryptography, and, JWT so I decided to seperate these explanations to each different directory.

# Goal

* you can explain what JWT is
* you can apply JWT-related library to you application

# prerequisites

* features/cryptograph/asymmetric_encryption
* features/cryptograph/digital_signature
* features/session

# What problem people had before?


# What is JWT

JWT is encrypted in base64 format and consists of three parts.They are seperated by period

1. header which tells type of the overall data and algorithm used for signature
2. payload that anyone can see. There are some predefined key 
in standard but you can add any key and values
3. signature. this is hash value of payload encryted by private key

# References

* Why base64url in JWT format

    * https://stackoverflow.com/questions/55389211/string-based-data-encoding-base64-vs-base64url

# examples

* nodejs

    * Example in nodejs directory manually sign and verify JWT one by one, so you can see how JWT
    work throughly. Modules used for the example are just Built-in module crypto, fs, 
    and npm module, base64url
    * The example shows two ways. One is manual way and the other is using convinient functions 
    offered by crypto module

* jsonwebtoken

    * This example abtract all necessary process for signing and verifying
    

