# Why did I study Cryptograph? What is my problem and goal?

A authentication system tutorial explained about cryptograph and how to use nodejs crpyto library, so I leave my note here. Although I do not have problem to use this feature when I uploaded this README.md file first, Actually, I know that this is really important for encrypted communication, so TLS(old name: SSL), SSH leverage these cryptograph feature, and I think I should know how it is implemented mathmatically, how to implement by myself, and weakness of old algorithms and old SSL protocols. I'll keep to upload crpyto-related code, tutorial, references and my notes.

# Examples

* asynmmetric_encryption/nodejs

    * encrypt plain text and decrypt code by using asymmetric encryption
    * people who has private key can only see the plain text

* digital_signature/nodejs
    
    * read asynmmetic_encryption first before you read this code
    * use hash function and asymmetic_encryption to identify that data is not modified by someone else who can monitor network
    * Unlike usual data encryption, anyone who has public key can see plain data. Digital Signature is just for identification
