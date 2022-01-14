module.exports = {
    HOST: "us-cdbr-east-05.cleardb.net",
    USER: "b08b9dd17f049a",
    PASSWORD: "d7656b84",
    DB: "heroku_b15fe88b3090ab8",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};