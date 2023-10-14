const { findAll, findOnePostBySlug, update, deleteAll, deleteOne, create } = require('../controller/Post');
const router = require('express').Router();

module.exports = app => {

    router.post('/create', create);
    
    router.get('/', findAll);
    
    router.get('/post/:slug', findOnePostBySlug);
    
    router.put('/update/:id', update);
    
    router.delete('/delete', deleteAll);
    
    router.delete('/delete/:id', deleteOne);
    


    app.use('/api/posts', router);
}