const { findAll, findOnePostBySlug, update, deleteAll, deleteOne, create } = require('../controller/Post');
const { verifyToken } = require('../middlewares/authJWT');
const router = require('express').Router();

module.exports = app => {

    router.post('/create', verifyToken, create);
    
    router.get('/', findAll);
    
    router.get('/post/:slug', findOnePostBySlug);
    
    router.put('/update/:id', verifyToken, update);
    
    router.delete('/delete', verifyToken, deleteAll);
    
    router.delete('/delete/:id', verifyToken, deleteOne);
    


    app.use('/api/posts', router);
}