const Article = require('./../models/article');

const express = require('express');
const router = express.Router();

router.get('/new', (req, res) =>  {
    res.render('articles/new', { article: new Article() });
});



router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article === null) {
        res.redirect('/');
    }
    res.render('articles/show', { article: article });
});

router.get('/:id/edit', async (req, res) => {
    const article = await Article.findById(req.params.id);
    res.render('articles/edit', { article: article});
});

router.put('/:id', async (req, res) => {
    let article = await Article.findById(req.params.id);
    try {
        article.title = req.body.title;
        article.description = req.body.description;
        article.markdown = req.body.markdown;
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } 
    catch (e) {
        console.log(e);
        res.render('articles/edit', { article: article });
    }
});

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    });
    try {
        article = await article.save();
        res.redirect(`/articles/${article.slug}`);
    } 
    catch (e) {
        console.log(e);
        res.render('articles/new', { article: article });
    }
});

module.exports = router