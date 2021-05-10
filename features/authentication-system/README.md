# Why I chose to study authentication system? What is my problem and goal?

my goal was to make my own blog web site. Because I hope to upload my post anywhere, I needed authentication system so nobody except me is allowed to upload posts. I chose to use locally stored user/password JWT authentication system. However, there are plenty of authentication systems like OAUTH or LDAP user authentication, so I decided to make this directory as category directory. 

# Examples

* local/passport

    * save username, hashed password to database 
    * use session and cookie to keep authenticated users to access their own resources until they click logout