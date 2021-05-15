# What does program show?

If you access localhost:3000/, you can get signed token as json format. If you
copy the token value and paste to Authroization header in postman program and 
go to localhost:3000/protected, you can see that you re authroized

# Tutorial

https://www.youtube.com/watch?v=F-sFp_AvHc8&t=8144s

# prerequisites

* features/JWT

    * JWT cannot be replacement of session. Keep in mind JWT is also a tool for
    specific problems. Use it properly

# References

Utilize this references afer wathcing tutorial

* passport-jwt

    * https://www.passportjs.org/packages/passport-jwt/

# How to install
    # go to authentication-system/JWT/passport directory
    npm install
    npm run startDev

    # install postman 
    # open localhost:3000/ in your browser and copy token value
    # add the token value to authorization header as 'Bearer <token>'
    # remeber the space between Bearer and <token>

# Test

# What's next?

* try OAUTH and OpenID Connect
