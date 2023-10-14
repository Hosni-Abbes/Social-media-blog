const categoryController = require('../controller/Category');
const router = require('express').Router();

module.exports = app => {

    router.post('/create', categoryController.create);



    app.use('/api/categories', router);

}