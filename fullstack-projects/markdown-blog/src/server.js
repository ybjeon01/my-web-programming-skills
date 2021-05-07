const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Article = require('./models/article');

const methodOverride = require('method-override');

// set mongoose database
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// default settings for app
// view engine
app.set('view engine', 'ejs');

// middlewares
// post body handler
app.use(express.urlencoded({ extended: false }));
// method override
app.use(methodOverride('_method'));

// add routers
const articleRouter = require('./routes/articles');
app.use('/articles', articleRouter);

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createAt: 'desc'
    });

    res.render('articles/index', { articles: articles });
})

// run
app.listen(3000);