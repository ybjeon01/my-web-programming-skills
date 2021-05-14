# What does program show?

When a client access the site first time, index page returned by server says 'hello, anonymous'. but if you send your name to server, it remembers your name in session, and when you revisit the site while the session is valid, it says 'hello, `<your name>`'

# Tutorial

https://www.youtube.com/watch?v=F-sFp_AvHc8&t=8144s

above tutorial is about how to implement authentication system. Watch express-session part

# References

* express-session library: https://www.npmjs.com/package/express-session
* server side rendering template engine library - ejs: https://ejs.co/


# How to install
    # go to express-session directory
    npm install
    npm run startDev

# Test

* Can you access session cookie value in req.session?

    * no, There is no reason for request handler to modify the key, I think it is intended not to allow to
    access the session cookie value.

* What happens if client change session cookie value?

    * server ignore the modified value and set new cookie for the connection

* What happens if another client hijack cookie of a client?

    * It seems like express-session check only cookie session.id value for indentifying client.
    if the value is changed, you can deceive the server as a different user.  

# What's next?

* try expires and max-age option
* read express-session doc and find what you can do more
* instead of in-memory stroage, use mongodb storage for session