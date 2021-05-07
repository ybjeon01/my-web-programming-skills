# Why I chose to make a markdown blog? What is my problem and goal?

While studying programming, I wanted to have my own website that I can write diary and show my work, so I chose to use wordpress. At first glance, the service seems really powerful because they offered nice dashboard and visual editor which does not require css or html knowledge. However, they did not allow free users to have full control such as organizing folders, styling, and javascript. Therefore, I decided to build my own website from bottom. I found a easy video tutorial that shows how to make a blog. I am going to follow the tutorial, make summary and plan what features I am going to implmenet so as to make my own website. This markdown blog is a very first step to build my own website. 

# What is Markdown blog?

A blog that user can save, edit, and delete markdown text. So when a user see a post that was written in markdown language, it is actually transformed to html code

# How install and use

    npm install
    npm run devStart
    # go to localhost:3000

# tutorial
https://www.youtube.com/watch?v=1NrHkjlWVhM


# tools, features that I learned

    * express

        * how to use middleware, router, async functions, next function in callback func, and render function
        * how to handle GET, POST, PUT, DELETE methods
        * how to handle dynamic url 

    * mongoose

        * how to connect to mongodb
        * how to make schema and use it. It is very similar to django's model
        * how to call a function before validation.

    * ejs

        * how to make dynamic page
        * syntax of ejs: <%= %>, <%- %>, <% %>

    * bootstrap

        * how to make a beautiful page

    * slug feature

        * how to use slugify tool to implement slug feature
    
    * markdown feature

        * how to use marked, jsdom, dompurify tools to implement markdown feature

# Summary

1. set environment: install webframework, database driver, and template engine

        npm install express mongoose ejs
        npm install --save-dev nodemon # tool that help develop
        git init

2. test if express and template engine work

    * code: server.js
    * remember:

            app.set('view engine', 'ejs'); // without setting, template should be inside <app>/views directory
            app.get('/', (req, res) => {
                res.render(<file name>, <context>)
            }

3. install mongodb, connect to it by using mongoose and make schema

    * code: server.js, models/article
    * to prevent deprecation warning, mongoose.connect needs some options
        
            mongoose.connect('mongodb://localhost/blog', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            });

4. make a index page

    * code: server.js, views/index.ejs
    * it read articles from mongodb and render index page with articles

5. organize article related code in a file named article.js

    * code: routes/article.js, models/article.js, views/articles/<every file>
    * save, edit, delete, detail view code
    * because mongoose function is async function, you also need to put async in app.<method> callback function
    * expressjs does not parse post request body. you need to set middleware for the body params
            
            app.set(express.urlencoded({ extended: false })); // server.js file

6. let user to access a post by slug
    * code: routes/article.js, models/article.js
    * because accessing post by id in url is not user friendly, change id part to esaily understandable words which is called slug
    * install slugify module. slugify change characters to some url valid characters if url is invalid
    * let the schema automatically make slug by using pre function
    * change :id part to :slug
    * replace find() to findOne({slug: req.params.slug})

7. allow user to add html code
    * code: models/article.js
    * this code transform markdown code given by a user to html code and save it into database
    * install marked, jsdom, dompurify modules
    * marked library change marked language to html code
    * dompurify library prevents evil user from putting malicious code in html code
    * jsdom is used for dompurify

8. add put and delete method handler for editing and deleting a post
    * code: routes/article.js, views/articles/[edit.ejs, index.js]
    * To edit and delete, you can use put and delete method handlers, but `<a>, <form>` can handle only get and post. so it needs a way to connect
      post request to put or delete handler. This can be achieved by using a module named method-override. Or simply you can only use post and get handlers
    * install method-override
    * add middleware to express app

            app.use(methodOverride('_method'));
    
    * ex:
    
            <form class='d-inline' action='/articles/<%= article.id %>?_method=DELETE' method='POST'>
                <button type='submit' class='btn btn-danger'>Delete</button>
            </form>


# What else I learned?

* new Date() vs Date.now()
    * Date.now() returns number and new Date() returns object

* Date method: Date.toLocaleDateString()
    * This is locale not local

# What's next?

Learn following features and tools

* authentication system
    * one for restapi and another for server side rendering web pages
* bootstrap for css
* reactjs for single page app