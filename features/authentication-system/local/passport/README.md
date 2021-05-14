# What does program show?

When a client access the site first time, index page returned by server says 'hello, anonymous', and there are login and register forms. If you register, you can add your user info to database, and if you log in, you can see `hello, <your username>` in the page

# Tutorial

https://www.youtube.com/watch?v=F-sFp_AvHc8&t=8144s


# References

Utilize this references afer wathcing tutorial

* feautres/session/express-session: https://github.com/ybjeon01/my-web-programming-skills/tree/main/features/session/express-session
* express session library: https://www.npmjs.com/package/express-session
* passport authentication library: https://www.passportjs.org/
* server side rendering template engine: https://ejs.co/
* crypto https://github.com/npm/deprecate-holder # this library is deprecated. use crypto-js package
* mongoose https://mongoosejs.com/

# How to install
    # go to authentication-system/local/passport directory
    # first run your own mongodb database with 127.0.0.1:27017 address that allows anonymous users (in production server, you need proper security)
    npm install
    npm run startDev

# Test

* What happens if client change session cookie value?

    * server ignore the modified value and set new cookie for the connection

* What happens if another client hijack cookie of a client?

    * It seems like express-session check only cookie session.id value for indentifying client.
    if the value is changed, you can deceive the server as a different user.

* passport-related questions

    * What happen you register, while logged in?

        * If there is not code that prevents you from registering, you are allowed to register, but passport makes your session invalid at the same time(log out)

    * What happen if you log in with the same account or other account while you are logged in?
        * If there is not code that prevents you from logging in, passport accepts login (It does not mean your session is associated with two or more users at the same time. just last loggin user is associated with session) 

# What's next?

* try jwt-based loggin, OAUTH
* save your session data to database instead of memory
* study more about mongodb for secure authentication system
* study more about crpytography