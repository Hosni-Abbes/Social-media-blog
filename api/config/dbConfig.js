module.exports = {
    HOST: '127.0.0.1',
    USER: 'root',
    PASSWORD: '',
    DATABASE: 'njs_blog',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
}