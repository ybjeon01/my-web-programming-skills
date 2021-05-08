# Reason to study Session

While studying authentication system, I found that it uses various features such as cookie, session, and cryptography, so I decided to seperate these explanations to each different directory.

# Goal

* you can explain what session is
* you can apply session-related library to you application

# tutorials and references I used

* As referenced in authentication-system, you can watch https://www.youtube.com/watch?v=F-sFp_AvHc8 by  Zach Gollwitzer. 
* stackoverflow question: https://stackoverflow.com/questions/3804209/what-are-sessions-how-do-they-work

# What problem people had before?

Because HTTP is stateless, in order to associate a request to any other request, you need a way to store user data between HTTP requests.

Cookies or URL parameters ( for ex. like http://example.com/myPage?asd=lol&boo=no ) are both suitable ways to transport data between 2 or more request. However they are not good in case you don't want that data to be readable/editable on client side.

The solution is to store that data server side, give it an "id", and let the client only know (and pass back at every http request) that id. There you go, sessions implemented. Or you can use the client as a convenient remote storage, but you would encrypt the data and keep the secret server-side

# What is Session

Session is a temporary and interactive information interchange between two or more communicating devices. This is just a concept. You can use in-memory storage, database, or even file to implement session.

# examples

* express-session