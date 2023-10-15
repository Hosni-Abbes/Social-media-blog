const router = require('express').Router();
const { register, login, logout } = require('../controller/Auth');
const { verifyToken } = require('../middlewares/authJWT');

module.exports = app => {
    // Auth routes
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post('/auth/logout', verifyToken, logout);

    

    app.use('/api', router);
}