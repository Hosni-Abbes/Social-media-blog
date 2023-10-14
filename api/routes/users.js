const router = require('express').Router();
const { register, login, logout } = require('../controller/Auth');


module.exports = app => {
    // Auth routes
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/auth/logout', logout);

    


    app.use('/api', router);
}